'use strict';
import AWS from "aws-sdk";

AWS.config.loadFromPath("secrets.json");
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const table1 = 'auth_table';
const table2 = 'data_table';

// authentication
export async function get_auth(username, password) {

}

export async function put_auth(username, password) {

}

// data
export async function put_data(username, text, sentiment, language, date) {

}

export async function update_sentiment_data(username, text, sentiment) {

}

export async function update_language_data(username, text, language) {

}

export async function delete_data(username, text) {

}

export async function get_data(username) {
    let response = [];
    let items;
    let params = {
        TableName : table2,
        KeyConditionExpression: "username = :val",
        ExpressionAttributeValues: {
            ":val": username
        }
    };

    do {
        items = await DynamoDB.query(params).promise();
        items.Items.forEach((item) => response.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } 
    while(typeof items.LastEvaluatedKey !== "undefined");

    return response;
}