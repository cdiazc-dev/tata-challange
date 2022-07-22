import AWS from 'aws-sdk';
import * as expressionDynamoDB from '../helpers/dynamoExpression.helper'

console.log('---------------------------------------------');
console.log(process.env.CHARACTER_TABLE_NAME);
console.log('---------------------------------------------');
let options = {};

if (process.env.JEST_WORKER_ID) {
  options = {
    endpoint: 'http://localhost:8000',
    region: 'local-env',
    ssEnabled: false
  }
}

const dynamoDB = new AWS.DynamoDB.DocumentClient(options);

const DynamoDBHelper = {

  async get(tableName, key) {
    return await dynamoDB.get({
      TableName: tableName,
      Key: key
    }).promise();
  },

  async scan(tableName) {
    return await dynamoDB.scan({
      TableName: tableName,
    }).promise();
  },

  async create(tableName, object) {
    return await dynamoDB.put({
      TableName: tableName,
      Item: object
    }).promise();
  },

  async bulk(params) {
    return await dynamoDB.batchWrite(params).promise();
  },

  async update(tableName, key, object) {
    return await dynamoDB.update({
      TableName: tableName,
      Key: key,
      UpdateExpression: expressionDynamoDB.getUpdateExpression(object),
      ExpressionAttributeValues: expressionDynamoDB.getAttributeExpressionValues(object),
    }).promise();
  },

  async remove(tableName, key) {
    return await dynamoDB.delete({
      TableName: tableName,
      Key: key
    }).promise();
  },

};

export default DynamoDBHelper;
