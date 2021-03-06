import AWS from '../../vendor/aws-sdk-umd';

export const BUCKET = 'gifs.bjacobel.com';
export const REGION = 'us-east-1';
export const COGNITO_POOL = 'us-east-1:a3c00e52-a8db-4b93-b1e1-8949a1759afe';
export const DYNAMO_TABLE = 'gifs';

AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: COGNITO_POOL,
});

AWS.XML.Parser = AWS.NodeParser;

export const API = AWS;
