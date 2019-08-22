#!/usr/bin/env bash

SERVICE_NAME="lucy"

echo "Branch: ${CIRCLE_BRANCH}"

if [ "${CIRCLE_BRANCH}" != "qa" ] && [ "${CIRCLE_BRANCH}" != "staging" ] && [ "${CIRCLE_BRANCH}" != "prod" ]; then
    echo "Not a deployment branch; exiting"
    exit;
fi

function get_parameter {
    parameter=$1
    aws ssm get-parameter --with-decryption --name /${CIRCLE_BRANCH}/$SERVICE_NAME/${parameter} | jq -r .Parameter.Value
}

function get_env_parameter {
    parameter=$1
    aws ssm get-parameter --with-decryption --name /${CIRCLE_BRANCH}/${parameter} | jq -r .Parameter.Value
}

sudo apt-get -y update
sudo apt-get -y install python python-pip python-dev python-setuptools curl
sudo pip install --upgrade awscli


echo "⚙ Getting webpack parameters..."
export API_ROOT=$(get_env_parameter azazzle/app_url)
export API_VERSION=$(get_env_parameter azazzle/api_version)
export AWS_S3_MEDIA_BUCKET=$(get_parameter aws_s3_media_bucket)
export FACEBOOK_APP_ID=$(get_parameter FACEBOOK_APP_ID)
export FACEBOOK_SCOPES=$(get_parameter FACEBOOK_SCOPES)
export GOOGLE_API_KEY=$(get_parameter GOOGLE_API_KEY)
export GOOGLE_CLIENT_ID=$(get_parameter GOOGLE_CLIENT_ID)
export GOOGLE_DISCOVERY_DOCS=$(get_parameter GOOGLE_DISCOVERY_DOCS)
export GOOGLE_SCOPE=$(get_parameter GOOGLE_SCOPE)
export INSTAGRAM_CLIENT_ID=$(get_parameter INSTAGRAM_CLIENT_ID)
export INSTAGRAM_CLIENT_SECRET=$(get_parameter INSTAGRAM_CLIENT_SECRET)
export INSTAGRAM_GRANT_TYPE=$(get_parameter INSTAGRAM_GRANT_TYPE)
export INSTAGRAM_REDIRECT_URI=$(get_parameter INSTAGRAM_REDIRECT_URI)
export INSTAGRAM_RESPONSE_TYPE=$(get_parameter INSTAGRAM_RESPONSE_TYPE)
export QAPI_ROOT=$(get_env_parameter api_url)
export QAPI_VERSION=$(get_env_parameter api_version)
export REDIS_HOST=$(get_env_parameter lumiere/redis_host)


echo "🛠 Building static files..."
npm run build:$CIRCLE_BRANCH

echo "🛠 Building the Docker image..."
$(aws ecr get-login --region us-east-1 | sed -e 's/-e none//g' | sed 's|https://||')
docker build --no-cache -t $SERVICE_NAME:$CIRCLE_BRANCH .
docker tag $SERVICE_NAME:$CIRCLE_BRANCH 688003391719.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME:$CIRCLE_BRANCH

echo "📦 Pushing the Docker image..."
docker push 688003391719.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME:$CIRCLE_BRANCH

echo "🚀 Deploying ECS service..."
aws ecs update-service --region us-east-1 --cluster ${SERVICE_NAME}-${CIRCLE_BRANCH} --service $SERVICE_NAME --task-definition ${SERVICE_NAME}-${CIRCLE_BRANCH} --force-new-deployment

echo "⏱ Waiting for ECS Service to update..."
sleep 10

STATUS=$(aws ecs describe-services --cluster ${SERVICE_NAME}-${CIRCLE_BRANCH} --service ${SERVICE_NAME} --query 'services[0].events[0].message')
while ! [[ "$STATUS" == *"(service ${SERVICE_NAME}) has reached a steady state."* ]]; do
    echo "⏱ ECS Status: $STATUS"
    sleep 10
    export STATUS=$(aws ecs describe-services --cluster ${SERVICE_NAME}-${CIRCLE_BRANCH} --service ${SERVICE_NAME} --query 'services[0].events[0].message')
done
echo "⏱ ECS Status: $STATUS"
echo "✨ Done"
