## udacity-c3-project-pec

### Building

This repository uses Travis CI.
Build is done directly in Travis: containers are built and pushed to Docker hub after build has completed.

Otherwise to build containers manually, execute the following code in the root project directory:
```
docker-compose -f udacity-c3-deployment/docker/docker-compose-build.yaml build
```

### Running the application

#### Environment variables

The following environment variables are needed to run the application either locally or on a Kubernetes cluster:
* `UDACITY_CLOUDDEVELOPER_AWS_MEDIA_BUCKET`: the name of the S3 bucket where images will be uploaded.
* `UDACITY_CLOUDDEVELOPER_AWS_PROFILE`: the name of the AWS profile in the credentials file (if run locally) or credentials Secret (if run on a Kubernetes cluster) that need to have proper rights for the application to run with the S3 bucket and the RDS instance.
* `UDACITY_CLOUDDEVELOPER_AWS_REGION`: the name of the AWS region for interacting with AWS products.
* `UDACITY_CLOUDDEVELOPER_RDS_DBNAME`: the name of the database on the RDS instance which contains the images. 
* `UDACITY_CLOUDDEVELOPER_RDS_USERNAME`: the master username of the RDS instance.
* `UDACITY_CLOUDDEVELOPER_RDS_PASSWORD`: the password of the master username of the RDS instance.
* `UDACITY_CLOUDDEVELOPER_RDS_HOST`: the endpoint of the RDS instance.
* `JWT_SECRET`: The secret used to validate JWTs for protected routes.
* `URL`: the allowed callback URL once authentication has completed.

#### Running the application locally

Build the containers (see previous section), then go to the root project directory and run:
```
docker-compose -f udacity-c3-deployment/docker/docker-compose.yaml up
```

#### Running the application on a Kubernetes cluster
Start a Kubernetes cluster. Go into the `udacity-c3-deployment/k8s` directory and:
1. Add the following files:
   1. `aws-secret.yaml`: a Kubernetes Secret file containing base64 encoding of aws credentials file in the `credentials`variable
   2. `env-configmap.yaml`: a Kubernetes ConfigMap file containing values for the environment variables listed above, except `UDACITY_CLOUDDEVELOPER_RDS_USERNAME` and `UDACITY_CLOUDDEVELOPER_RDS_PASSWORD` which are detailed in the next file.
   3. `env-secret.yaml`: a Kubernetes ConfigMap file containing values for the following environment variables: `UDACITY_CLOUDDEVELOPER_RDS_USERNAME` and `UDACITY_CLOUDDEVELOPER_RDS_PASSWORD`
1. Deploy configmaps and secrets:
   ```
   kubectl apply -f aws-secret.yaml -f env-configmap.yaml -f env-secret.yaml
   ```

1. Deploy *deployments*:
   ```
   kubectl apply -f backend-feed-deployment.yaml -f backend-user-deployment.yaml -f frontend-deployment.yaml
   ```
   then:
   ```
   kubectl apply -f reverseproxy-deployment.yaml
   ```

1. Deploy *services*:
   ```
   kubectl apply -f backend-feed-service.yaml -f backend-user-service.yaml -f frontend-service.yaml -f reverseproxy-service.yaml
   ```

1. Make appropriate port forwarding:
   ```
   kubectl port-forward deployment/frontend 8100:80
   kubectl port-forward deployment/reverseproxy 8080:8080 
   ```

1. Navigate to `localhost:8100` to run the application.

### Note for Udacity reviewer

The `k8s-screenshots` directory contains screenshots that prove the following:
* A Kubernetes cluster is running on AWS EKS service (`cluster_active.png`)
* The application has been deployed with `kubectl` (`pods_running.png`)
* Cluster logging is enabled (`cluster_logging_enabled.png`)
* Application logs are enabld (`applicative_logs.png`, `applicative_log_example.png`)

Docker images can be found here: https://hub.docker.com/u/pierreedouardchaix
