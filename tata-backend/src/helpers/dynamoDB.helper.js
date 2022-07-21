import AWS from 'aws-sdk';
import * as expressionDynamoDB from '../helpers/dynamoExpression.helper'

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const get = async(tableName, key) => {
    return await dynamoDB.get({
        TableName: tableName,
        Key: key
      }).promise();
}

export const scan = async(tableName) => {
  return await dynamoDB.scan({
    TableName: tableName,
  }).promise();
}

export const create = async(tableName, object) => {
    return await dynamoDB.put({
        TableName: tableName,
        Item: object
      }).promise();
}

export const bulk = async(params) => {
  return await dynamoDB.batchWrite(params).promise();
}

export const update = async(tableName, key, object) => {
  return await dynamoDB.update({
      TableName: tableName,
      Key: key,
      UpdateExpression: expressionDynamoDB.getUpdateExpression(object),
      ExpressionAttributeValues: expressionDynamoDB.getAttributeExpressionValues(object),
    }).promise();
}

export const remove = async(tableName, key) => {
    return await dynamoDB.delete({
        TableName: tableName,
        Key: key
      }).promise();
}