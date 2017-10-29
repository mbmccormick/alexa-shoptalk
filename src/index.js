var Alexa = require("alexa-sdk");

var audioAssets = require("./audioAssets");

var alexa;

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.505952f2-67df-4724-9de4-41be92ee0585";
    
    alexa.registerHandlers(defaultHandler);

    alexa.execute();
};

var defaultHandler = {

    "LaunchRequest": function () {
        printDebugInformation("defaultHandler:LaunchRequest");

        this.response.audioPlayerPlay("REPLACE_ALL", audioAssets[0].url, audioAssets[0].name, null, 0);
        this.emit(":responseReady");
    },

    "AMAZON.PauseIntent": function () {
        printDebugInformation("defaultHandler:AMAZON.PauseIntent");

        this.response.audioPlayerStop();
        this.emit(":responseReady");
    },

    "AMAZON.ResumeIntent": function () {
        printDebugInformation("defaultHandler:AMAZON.ResumeIntent");

        this.response.audioPlayerPlay("REPLACE_ALL", audioAssets[0].url, audioAssets[0].name, null, 0);
        this.emit(":responseReady");
    },

    "AMAZON.HelpIntent": function () {
        printDebugInformation("defaultHandler:AMAZON.HelpIntent");

        this.emit(":tell", "Help is not yet implemented.");
    },

    "Unhandled": function () {
        printDebugInformation("defaultHandler:Unhandled");

        this.emit(":tell", "Help is not yet implemented.");
    }

};

function printDebugInformation(message) {
    if (process.env.DEBUG) {
        console.log(message);
    }
}