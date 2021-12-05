'use strict'
import AWS from 'aws-sdk'

const DynamoDB = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
})

export class Dynamo {
  async put (params) {
    try {
      await DynamoDB.put(params).promise()
    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }

  async get (params) {
    const response = []
    let items

    do {
      items = await DynamoDB.query(params).promise()
      items.Items.forEach((item) => response.push(item))
      params.ExclusiveStartKey = items.LastEvaluatedKey
    }
    while (typeof items.LastEvaluatedKey !== 'undefined')

    return response
  }

  async update (params) {
    try {
      await DynamoDB.update(params).promise()
    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }

  async delete (params) {
    try {
      await DynamoDB.delete(params).promise()
    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }
}
