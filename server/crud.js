'use strict';
import AWS from "aws-sdk";

AWS.config.loadFromPath("secrets.json");
const DynamoDB = new AWS.DynamoDB.DocumentClient();

export class Dynamo {

    async put(params) {
        let response = false;
    
        try {
            await DynamoDB.put(params).promise();
            response = true;
        }
        catch (err) {
            console.log(err);
        }
    
        return response;
    }

    async get(params) {
        let response = [];
        let items;
    
        do {
            items = await DynamoDB.query(params).promise();
            items.Items.forEach((item) => response.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        }
        while (typeof items.LastEvaluatedKey !== "undefined");
    
        return response;
    }
    
    async update(params) {
        let response = false;
    
        try {
            await DynamoDB.update(params).promise();
            response = true;
        }
        catch (err) {
            console.log(err);
        }
    
        return response;
    }
    
    async delete(params) {
        let response = false;
    
        try {
            await DynamoDB.delete(params).promise();
            response = true;
        }
        catch (err) {
            console.log(err);
        }
    
        return response;
    }
}