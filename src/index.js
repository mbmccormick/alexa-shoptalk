var Alexa = require("alexa-sdk");

var audioData = require("./audioData");

var alexa;

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.505952f2-67df-4724-9de4-41be92ee0585";
    alexa.dynamoDBTableName = "Shoptalk";

    alexa.registerHandlers(defaultHandler);

    alexa.execute();
};

var defaultHandler = {

    "LaunchRequest": function () {
        printDebugInformation("defaultHandler:LaunchRequest");

        this.emit(":tell", "Welcome to Shoptalk. You can choose from three audio streams: Morning Murmur, Lunchtime Lounge, and University Undertones. To play a stream, you can say 'Alexa, ask Shoptalk to play Morning Murmur', for example.");
    },

    "MORNINGMURMUR": function () {
        printDebugInformation("defaultHandler:MORNINGMURMUR");

        var index = 0;
        var audio = audioData[index];

        this.attributes["index"] = index;

        // start audio playback of Morning Murmur
        this.response.speak("Now playing " + audio.name + ".").audioPlayerPlay("REPLACE_ALL", audio.url, audio.name, null, 0);
    },

    "LUNCHTIMELOUNGE": function () {
        printDebugInformation("defaultHandler:LUNCHTIMELOUNGE");

        var index = 1;
        var audio = audioData[index];

        this.attributes["index"] = index;

        // start audio playback of Lunchtime Lounge
        this.response.speak("Now playing " + audio.name + ".").audioPlayerPlay("REPLACE_ALL", audio.url, audio.name, null, 0);
    },

    "UNIVERSITYUNDERTONES": function () {
        printDebugInformation("defaultHandler:UNIVERSITYUNDERTONES");

        var index = 2;
        var audio = audioData[index];

        this.attributes["index"] = index;

        // start audio playback of University Undertones
        this.response.speak("Now playing " + audio.name + ".").audioPlayerPlay("REPLACE_ALL", audio.url, audio.name, null, 0);
    },

    "AMAZON.PauseIntent": function () {
        printDebugInformation("defaultHandler:AMAZON.PauseIntent");

        this.attributes["offsetInMilliseconds"] = this.event.request.offsetInMilliseconds;

        // stop audio playback
        this.response.audioPlayerStop();
    },

    "AMAZON.ResumeIntent": function () {
        printDebugInformation("defaultHandler:AMAZON.ResumeIntent");

        var index = parseInt(this.attributes["index"]);
        var audio = audioData[index];
        var offsetInMilliseconds = this.attributes["offsetInMilliseconds"];

        // resume audio playback
        this.response.audioPlayerPlay("REPLACE_ALL", audio.url, audio.name, null, offsetInMilliseconds);
    },

    "AMAZON.HelpIntent": function () {
        printDebugInformation("defaultHandler:AMAZON.HelpIntent");

        this.emit(":tell", "You can choose from three audio streams: Morning Murmur, Lunchtime Lounge, and University Undertones. To play a stream, you can say 'Alexa, ask Shoptalk to play Morning Murmur', for example.");
    },

    "PlaybackNearlyFinished": function () {
        printDebugInformation("defaultHandler:PlaybackNearlyFinished");

        var index = parseInt(this.attributes["index"]);
        var audio = audioData[index];

        // queue up the audio stream to loop playback
        this.response.audioPlayerPlay("ENQUEUE", audio.url, audio.name, null, 0);
    },

    "PlaybackFailed": function () {
        printDebugInformation("defaultHandler:PlaybackFailed");

        this.emit(":tell", "Sorry, I'm having trouble accessing the audio stream right now. Please try again later.");
    },

    "Unhandled": function () {
        printDebugInformation("defaultHandler:Unhandled");

        this.emit(":tell", "Sorry, I didn't understand your request. If you need help, just ask for help.");
    }

};

function printDebugInformation(message) {
    if (process.env.DEBUG) {
        console.log(message);
    }
}