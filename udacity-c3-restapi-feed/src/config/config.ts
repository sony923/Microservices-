export const config = {
  "dev": {
    "username": process.env.UDACITY_CLOUDDEVELOPER_RDS_USERNAME,
    "password": process.env.UDACITY_CLOUDDEVELOPER_RDS_PASSWORD,
    "database": process.env.UDACITY_CLOUDDEVELOPER_RDS_DBNAME,
    "host": process.env.UDACITY_CLOUDDEVELOPER_RDS_HOST,
    "dialect": process.env.UDACITY_CLOUDDEVELOPER_RDS_DIALECT,
    "aws_region": process.env.UDACITY_CLOUDDEVELOPER_AWS_REGION,
    "aws_profile": process.env.UDACITY_CLOUDDEVELOPER_AWS_PROFILE,
    "aws_media_bucket": process.env.UDACITY_CLOUDDEVELOPER_AWS_MEDIA_BUCKET,
    "url": "localhost:8080"
  },
  "prod": {
    "username": process.env.UDACITY_CLOUDDEVELOPER_RDS_USERNAME,
    "password": process.env.UDACITY_CLOUDDEVELOPER_RDS_PASSWORD,
    "database": process.env.UDACITY_CLOUDDEVELOPER_RDS_DBNAME,
    "host": process.env.UDACITY_CLOUDDEVELOPER_RDS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.UDACITY_CLOUDDEVELOPER_AWS_REGION,
    "aws_profile": process.env.UDACITY_CLOUDDEVELOPER_AWS_PROFILE,
    "aws_media_bucket": process.env.UDACITY_CLOUDDEVELOPER_AWS_MEDIA_BUCKET,
    "url": process.env.URL
  },
  "jwt": {
    "secret": process.env.JWT_SECRET
  }
};
