module.exports.SAMPLE_GET_EVENT = {
  resource: '/user-info',
  path: '/user-info',
  httpMethod: 'GET',
  headers:
  {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Cache-Control': 'no-cache',
    Host: 'jpb4l2mmq1.execute-api.us-east-2.amazonaws.com',
    'Postman-Token': '4c4a0151-8256-40e9-a938-48fc8375032f',
    'User-Agent': 'PostmanRuntime/7.16.3',
    'X-Amzn-Trace-Id': 'Root=1-5d785102-8acc1ad59eff7e9950273fe7',
    'x-api-key': 'dDT1hKxOgS61frbcUMi4Q5N43jPMSCfuaSSr88yr',
    'X-Forwarded-For': '107.15.246.212',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  multiValueHeaders:
  {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate'],
    'Cache-Control': ['no-cache'],
    Host: ['jpb4l2mmq1.execute-api.us-east-2.amazonaws.com'],
    'Postman-Token': ['4c4a0151-8256-40e9-a938-48fc8375032f'],
    'User-Agent': ['PostmanRuntime/7.16.3'],
    'X-Amzn-Trace-Id': ['Root=1-5d785102-8acc1ad59eff7e9950273fe7'],
    'x-api-key': ['dDT1hKxOgS61frbcUMi4Q5N43jPMSCfuaSSr88yr'],
    'X-Forwarded-For': ['107.15.246.212'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https']
  },
  queryStringParameters: { userEmail: 'test-usser@email.com' },
  multiValueQueryStringParameters: { userEmail: ['test-usser@email.com'] },
  pathParameters: null,
  stageVariables: null,
  requestContext:
  {
    resourceId: 'g93ih0',
    resourcePath: '/user-info',
    httpMethod: 'GET',
    extendedRequestId: 'f1GYZFlwCYcFj_Q=',
    requestTime: '11/Sep/2019:01:42:26 +0000',
    path: '/develop/user-info',
    accountId: '714774807467',
    protocol: 'HTTP/1.1',
    stage: 'develop',
    domainPrefix: 'jpb4l2mmq1',
    requestTimeEpoch: 1568166146511,
    requestId: 'a251939d-6ce9-4e15-9595-270c4efd9223',
    identity:
    {
      cognitoIdentityPoolId: null,
      cognitoIdentityId: null,
      apiKey: 'dDT1hKxOgS61frbcUMi4Q5N43jPMSCfuaSSr88yr',
      principalOrgId: null,
      cognitoAuthenticationType: null,
      userArn: null,
      apiKeyId: 's26bzxc2ge',
      userAgent: 'PostmanRuntime/7.16.3',
      accountId: null,
      caller: null,
      sourceIp: '107.15.246.212',
      accessKey: null,
      cognitoAuthenticationProvider: null,
      user: null
    },
    domainName: 'jpb4l2mmq1.execute-api.us-east-2.amazonaws.com',
    apiId: 'jpb4l2mmq1'
  },
  body: null,
  isBase64Encoded: false
}