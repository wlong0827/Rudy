const functions = require('firebase-functions');

// var Swagger = require('swagger-client');
// var open = require('open');
// var rp = require('request-promise');

// config items
var pollInterval = 1000;
var directLineSecret = 'XQDzMRPGIs8.cwA.ifw.NmE1zazCH0_4uKkygAxL_TkbRSpCeA1wHogj6mNtKpQ';
var directLineClientName = 'DirectLineClient';
var directLineSpecUrl = 'https://docs.botframework.com/en-us/restapi/directline3/swagger.json';

// var directLineClient = rp(directLineSpecUrl)
//     .then(function (spec) {
//         // client
//         return new Swagger({
//             spec: JSON.parse(spec.trim()),
//             usePromise: true
//         });
//     })
//     .then(function (client) {
//         // add authorization header to client
//         client.clientAuthorizations.add('AuthorizationBotConnector', new Swagger.ApiKeyAuthorization('Authorization', 'Bearer ' + directLineSecret, 'header'));
//         return client;
//     })
//     .catch(function (err) {
//         console.error('Error initializing DirectLine client', err);
//     });

// // once the client is ready, create a new conversation 
// directLineClient.then(function (client) {
//     client.Conversations.Conversations_StartConversation()                          // create conversation
//         .then(function (response) {
//             return response.obj.conversationId;
//         })                            // obtain id
//         .then(function (conversationId) {
//             sendMessagesFromConsole(client, conversationId);                        // start watching console input for sending new messages to bot
//             pollMessages(client, conversationId);                                   // start polling messages from bot
//         });
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.receivedQuery = functions.database.ref('/conversations/-L-EhR3Ps0OXpU6hvhYP/{id}').onCreate(event => {

	const messageId = event.params.id;
	const message = event.data.val();
	const time = Math.floor(Date.now() / 1000);

	console.log("Message ID is ", messageId);
	console.log("Message is ", message);

	if(messageId.indexOf("Bot Response") != -1) {
		return console.log("Bot already responded");
	}

	// const getMessagePromise = admin.database().ref(`/conversations/-L-EhR3Ps0OXpU6hvhYP/${messageId}`).once('value');
	const response = {
		content : "test",
		fromID : "1vj712KhmheBF6sPdXY9wdOfKyj1",
		toID : "sNVP4BfozOZhmeXk9KVIhkpuGq52",
		isRead : false,
		type : "text",
		timestamp : time
	};

	return event.data.ref.parent.child('Bot Response - '.concat(time.toString())).set(response);

	// admin.database().ref('/conversations/-L-EhR3Ps0OXpU6hvhYP/').push(response).then(snapshot => {
	// 	console.log("Snapshot is ", snapshot);
	// });
});