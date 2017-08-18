// namespaces
const NAMESPACE_CONTROL = "Alexa.ConnectedHome.Control";
const NAMESPACE_DISCOVERY = 'Alexa.ConnectedHome.Discovery';

// discovery
const REQUEST_DISCOVER = 'DiscoverAppliancesRequest';
const RESPONSE_DISCOVER = 'DiscoverAppliancesResponse';

// control
const REQUEST_TURN_ON = 'TurnOnRequest';
const RESPONSE_TURN_ON = 'TurnOnConfirmation';
const REQUEST_TURN_OFF = 'TurnOffRequest';
const RESPONSE_TURN_OFF = 'TurnOffConfirmation';

// errors
const ERROR_UNSUPPORTED_OPERATION = 'UnsupportedOperationError';
const ERROR_UNEXPECTED_INFO = 'UnexpectedInformationReceivedError';

// entry
exports.handler = function(event, context, callback) {
  console.log(JSON.stringify(event));

  var requestedNamespace = event.header.namespace;

  var response = null;

  try {
    switch (requestedNamespace) {
      case NAMESPACE_DISCOVERY:
        response = handleDiscovery(event);
        break;
      case NAMESPACE_CONTROL:
        response = handleControl(event);
        break;
      default:
        response = handleUnexpectedInfo(requestedNamespace);
        break;
    } // switch
  } catch(error) {
    console.error(JSON.stringify(error));
  } // try-catch
  callback(null, response);
}
