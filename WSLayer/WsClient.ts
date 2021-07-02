import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
const XAWS = AWSXRay.captureAWS(AWS);

const stage = process.env.STAGE;
const apiId = process.env.API_ID;

export default class WsClient {
  constructor(
    protected readonly apigwManagementApi = new XAWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: `${apiId}.execute-api.us-east-2.amazonaws.com/${stage}`,
    })
  ) {}
}
