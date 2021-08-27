import json
import boto3

client = boto3.client('iot-data')

def lambda_handler(event, context):
    destination = event['multiValueQueryStringParameters']['destination'][0]
    print(event)

    response = client.publish(
        topic = 'setDestination',
        qos = 1,
        payload = json.dumps({"location":destination})
        #payload = json.dumps(destination) #depends on how we want format of message to be
    )
   
