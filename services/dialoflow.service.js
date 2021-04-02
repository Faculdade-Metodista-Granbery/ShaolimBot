require('dotenv').config()
const dialogflow = require('dialogflow');
const { v4: uuidv4 } = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample ({ message }) {
  // A unique identifier for the given session
  const sessionId = uuidv4();
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({ keyFilename: './dialogflow.credentials.json' });
  const sessionPath = sessionClient
    .sessionPath(process.env.DIALOG_FLOW_PROJECT_ID, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  if (result.intent.displayName === 'aula' && result.parameters.fields.temas) {
    // console.log(result.parameters.fields.temas);
    return result.parameters.fields.temas.stringValue;
  } else {
    return false;
  }
}

module.exports = {
  runSample,
};
