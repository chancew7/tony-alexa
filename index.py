import json
import boto3
import datetime
timestamp = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')
client = boto3.client('iot-data')


def lambda_handler(event, context):
    destination = event['multiValueQueryStringParameters']['destination'][0]  //replace destination with query string name
    print(event)
    roomId = 101                                                                                                                        

    response = client.publish(
        topic = 'setDestination',
        qos = 1,

        payload = json.dumps({"location":destination})             //replace destination with query string name
    )
    return {
        "statusCode": 200,
    } 