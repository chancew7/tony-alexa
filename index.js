'use strict';
const Alexa = require('alexa-sdk');
const req = require('request');
const APP_ID = undefined;

const SKILL_NAME = '';
const GET_FACT_MESSAGE = "";
const HELP_MESSAGE = 'Please repeat.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


var AWS = require('aws-sdk');
const apiLink = process.env.api;

const handlers = {
    'LaunchRequest': function () {
        this.emit('SetDestination');                //"SetDestination" should be replaced with the intent name
    },
    'SetDestination': function () {                 //"SetDestination" should be replaced with the intent name

var destination = this.event.request.intent.slots.destination.value;   //var name can be anything. second "destination" is slot value
        var url = apiLink + '/set-destination?destination=' + destination            //"set-destination" is API Gateway method name. first "destination" is query string. second is var name

        req.post(url, function(err, res, body) {
            if(err){
                console.log('error', err);
            } else{
                console.log('success', body);
            }
        });
        const speechOutput = 'Great! navigating to ' + destination+ ' now';    // destination is var name
        this.response.cardRenderer(SKILL_NAME, speechOutput);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },


    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
