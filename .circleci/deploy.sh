#!/bin/bash

echo "Branch: $CIRCLE_BRANCH"

sudo apt-get -y update && \
    sudo apt-get -y install apt-utils && \
    sudo apt-get -y upgrade && \
    sudo apt-get -y install python python-pip python-dev python-setuptools jq

sudo pip install --upgrade awscli

if [ $CIRCLE_BRANCH = "qa" ] || [ $CIRCLE_BRANCH = "staging" ]; then
    echo Building static files...
    npm run build:$CIRCLE_BRANCH
    echo Logging in to Amazon ECR...
    set +x
    $(aws ecr get-login --region us-east-1 | sed -e 's/-e none//g' | sed 's|https://||')
    echo Build started on `date`
    echo Updating static assets...
    echo Building the Lumiere Docker image...
    docker build --no-cache -t lumiere:$CIRCLE_BRANCH .
    docker tag lumiere:$CIRCLE_BRANCH 688003391719.dkr.ecr.us-east-1.amazonaws.com/lumiere:$CIRCLE_BRANCH
    echo Build completed on `date`
    echo Pushing the Docker image...
    docker push 688003391719.dkr.ecr.us-east-1.amazonaws.com/lumiere:$CIRCLE_BRANCH
    echo Updating task definition...
    aws ecs register-task-definition \
        --family lumiere-$CIRCLE_BRANCH \
        --container-definitions "$(aws s3 cp s3://quickframe-ecs-taskdef/lumiere/$CIRCLE_BRANCH.json -)" \
        --requires-compatibilities FARGATE \
        --network-mode awsvpc \
        --execution-role-arn arn:aws:iam::688003391719:role/ecsTaskExecutionRole \
        --task-role-arn arn:aws:iam::688003391719:role/ecsTaskExecutionRole \
        --cpu 256 \
        --memory 512
    echo Updating ECS service...
    aws ecs update-service --cluster lumiere-$CIRCLE_BRANCH --service lumiere --task-definition lumiere-$CIRCLE_BRANCH --force-new-deployment
    echo Cluster lumiere-$CIRCLE_BRANCH updated. 💫
else
    echo "Not a deployment branch; exiting"
    exit;
fi