require('dotenv').config();

const { handler } = require('../index');
const { SAMPLE_GET_EVENT, SAMPLE_POST_EVENT } = require('./sample-requests');

(async () => {
  const event = SAMPLE_POST_EVENT;
  try {
    const res = await handler(event);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
})();