'use strict';
import AWS from "aws-sdk";

AWS.config.loadFromPath("secrets.json");
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const table1 = 'auth_table';
const table2 = 'data_table';

// authentication
export async function get_auth(usr, pwd) {
    let response = [];
    let items;
    let params = {
        TableName: table1,
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
    while (typeof items.LastEvaluatedKey !== "undefined");

    return response[0];
}

export async function put_auth(username, password) {
    let response;
    let params = {
        TableName: table1,
        Items: {
            username: username,
            password: password
        }
    }

    try {
        await DynamoDB.put(params).promise();
        response = true;
    }
    catch (e) {
        console.log(e);
        response = false;
    }

    return response;

}

// data
export async function put_data(username, text, sentiment, language, date) {
    let response;
    let params = {
        TableName: table1,
        Items: {
            username: username,
            //text: text,

        }
    }

    try {
        await DynamoDB.put(params).promise();
        response = true;
    }
    catch (e) {
        console.log(e);
        response = false;
    }

    return response;
}

export async function update_sentiment_data(username, text, sentiment) {
    let response;
    let params = {
        TableName: table2,
        Key: {
            Key: username
        },
    };
    try {
        let retrievedData = await DynamoDB.delete(params).promise();
        params = {
            TableName: table1,
            Item: {
                Key: username,
                //text:text,
                //sentiment:sentiment
            }
        };

        try {
            await DynamoDB.put(params).promise();
            response = { 'message': "Data Updated" };
        }
        catch (err) {
            response = err;
        }
    }
    catch (err) {
        response = err;
    }
    return response;
}

export async function update_language_data(username, text, language) {
    let response;
    let params = {
        TableName: table2,
        Key: {
            Key: username
        },
    };
    try {
        let retrievedData = await DynamoDB.delete(params).promise();
        params = {
            TableName: table1,
            Item: {
                Key: username,
                //text:text,
                //language:language
            }
        };

        try {
            await DynamoDB.put(params).promise();
            response = { 'message': "Data Updated" };
        }
        catch (err) {
            response = err;
        }
    }
    catch (err) {
        response = err;
    }
    return response;
}

export async function delete_data(username, text) {
    let response = {};
    let params = {
        TableName: table2,
        Key: {
            Key: username
        }
    };

    try {
        await DynamoDB.delete(params).promise();
        response = { 'message': "Data Removed" };
    }
    catch (err) {
        response = err;
    }
}

export async function get_data(username) {
    let response = [];
    let items;
    let params = {
        TableName: table2,
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
    while (typeof items.LastEvaluatedKey !== "undefined");

    return response;
}