const accountSid = 'ACf5062d2ef043bdde412820bf7cd4ce39';
const authToken = '9d203a7d6b2d03e90377391acd9755e8';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'nuevo pedido de (nombre y email del usuario)',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491141615158',
  })
  .then((message) => console.log(message.sid));
