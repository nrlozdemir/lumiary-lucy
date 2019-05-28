#!/usr/bin/env bash
set -e

SERVICE_NAME="lucy"

echo "Branch: $CIRCLE_BRANCH"

if [ "$CIRCLE_BRANCH" != "qa" ] && [ "$CIRCLE_BRANCH" != "staging" ] && [ "$CIRCLE_BRANCH" != "prod" ]; then
    echo "Not a deployment branch; exiting"
    exit
fi

function get_parameter {
    parameter=$1
    aws ssm get-parameter --with-decryption --name /${CIRCLE_BRANCH}/$SERVICE_NAME/${parameter} | jq -r .Parameter.Value
}

function get_env_parameter {
    parameter=$1
    aws ssm get-parameter --with-decryption --name /${CIRCLE_BRANCH}/${parameter} | jq -r .Parameter.Value
}

echo "🛠 Building static files..."
npm run build:$CIRCLE_BRANCH

echo "🛠 Building the Docker image..."
$(aws ecr get-login --region us-east-1 | sed -e 's/-e none//g' | sed 's|https://||')
docker build --no-cache -t $SERVICE_NAME:$CIRCLE_BRANCH .
docker tag $SERVICE_NAME:$CIRCLE_BRANCH 688003391719.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME:$CIRCLE_BRANCH

echo "📦 Pushing the Docker image..."
docker push 688003391719.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME:$CIRCLE_BRANCH

echo "⚙ Getting config parameters..."
TASK_CPU=$(get_parameter task_cpu)
TASK_MEMORY=$(get_parameter task_memory)
TASK_ROLE=$(get_parameter task_role)
API_URL=$(get_env_parameter api_url)
API_VERSION=$(get_env_parameter api_version)
REDIS_HOST=$(get_env_parameter lumiere/redis_host)
EXISTING_TASK=$(get_parameter deployment_checksum)

echo "📦 Generating Container Definition..."
cat > /tmp/containerdef.json <<JSON
[
  {
    "name": "${SERVICE_NAME}-${CIRCLE_BRANCH}-container",
    "image": "688003391719.dkr.ecr.us-east-1.amazonaws.com/${SERVICE_NAME}:${CIRCLE_BRANCH}",
    "logConfiguration": {
      "logDriver": "syslog",
      "options": {
        "syslog-address": "udp://logs3.papertrailapp.com:34568",
        "tag": "${SERVICE_NAME}-${CIRCLE_BRANCH}/{{.ID}}"
      }
    },
    "privileged": true,
    "environment": [
      {
        "name": "API_URL",
        "value": "${API_URL}"
      },
      {
        "name": "API_VERSION",
        "value": "${API_VERSION}"
      },
      {
        "name": "BASENAME",
        "value": "/"
      },
      {
        "name": "CLOUDWATCH_REGION",
        "value": "us-east-1"
      },
      {
        "name": "ENVIRONMENT",
        "value": "${CIRCLE_BRANCH}"
      },
      {
        "name": "MEDIA_BUCKET",
        "value": "quickframe-media-${CIRCLE_BRANCH}"
      },
      {
        "name": "NODE_ENV",
        "value": "production"
      },
      {
        "name": "PORT",
        "value": "80"
      },
      {
        "name": "REDIS_HOST",
        "value": "${REDIS_HOST}"
      },
      {
        "name": "STATIC_URL",
        "value": "https://s3.amazonaws.com/quickframe-static-${CIRCLE_BRANCH}/"
      }
    ],
    "secrets": [
      {
        "name": "CLOUDWATCH_ACCESS_KEY_ID",
        "valueFrom": "/cloudwatch/access_key_id"
      },
      {
        "name": "CLOUDWATCH_SECRET_ACCESS_KEY",
        "valueFrom": "/cloudwatch/secret_access_key"
      },
      {
        "name": "BASIC_AUTH_USER",
        "valueFrom": "/${CIRCLE_BRANCH}/${SERVICE_NAME}/basic_auth_user"
      },
      {
        "name": "BASIC_AUTH_PASSWORD",
        "valueFrom": "/${CIRCLE_BRANCH}/${SERVICE_NAME}/basic_auth_password"
      }
    ],
    "portMappings": [
      {
        "containerPort": 80
      }
    ]
  }
]
JSON

echo Calculating Checksum...
cp /tmp/containerdef.json /tmp/newtask
echo "$TASK_CPU $TASK_MEMORY $TASK_ROLE" >> /tmp/newtask
CHECHSUM=$(md5sum /tmp/newtask | awk '{print $1}')

if [ "${EXISTING_TASK}" == "${CHECHSUM}" ]; then
    echo Task definition did not change. Skipping update...
else
    echo "📝 Updating task definition..."
    aws ecs register-task-definition \
        --family ${SERVICE_NAME}-${CIRCLE_BRANCH} \
        --execution-role-arn $TASK_ROLE \
        --task-role-arn $TASK_ROLE \
        --requires-compatibilities EC2 \
        --network-mode awsvpc \
        --cpu $TASK_CPU \
        --memory $TASK_MEMORY \
        --container-definitions "$(cat /tmp/containerdef.json)"
fi

echo "🚀 Deploying ECS service..."
aws ecs update-service --region us-east-1 --cluster ${SERVICE_NAME}-${CIRCLE_BRANCH} --service $SERVICE_NAME --task-definition ${SERVICE_NAME}-${CIRCLE_BRANCH} --force-new-deployment

echo "⏱ Waiting for ECS Service to update..."
sleep 30

echo "📝 Updating deployment checksum..."
aws ssm put-parameter --name "/$CIRCLE_BRANCH/$SERVICE_NAME/deployment_checksum" --type "String" --value "$CHECHSUM" --overwrite

STATUS=$(aws ecs describe-services --cluster ${SERVICE_NAME}-${CIRCLE_BRANCH} --service $SERVICE_NAME | jq '.services[0].events[0].message')
while ! [[ "$STATUS" == *"(service $SERVICE_NAME) has reached a steady state."* ]]; do
    echo "⏱ ECS Status: $STATUS"
    sleep 10
    export STATUS=$(aws ecs describe-services --cluster ${SERVICE_NAME}-${CIRCLE_BRANCH} --service $SERVICE_NAME | jq '.services[0].events[0].message')
done
echo "⏱ ECS Status: $STATUS"
echo "✨ Done"
