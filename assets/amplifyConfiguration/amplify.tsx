import { Amplify, API } from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'MyAPIGatewayAPI',
        endpoint: 'https://1234567890-abcdefgh.amazonaws.com',
        region: 'ap-southeast-1',
      },
    ],
  },
});
