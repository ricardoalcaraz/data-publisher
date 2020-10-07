'use strict'
const NATS = require('nats')
const NATS_URL = process.env.nats_url || "nats://localhost:4222";

module.exports = async (event, context) => {
  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body)
  }
  
  const topic = event.body.topic || "house.sensor";

  // [begin publish_bytes]
  const nc = NATS.connect({ url: NATS_URL, json: true})
  nc.publish(topic, event.body.montie)

  // [end publish_bytes]
  nc.flush(() => {
      nc.close()
  })
  
  return context
    .status(200)
    .succeed(event.body.montie)
}