import nats, {Message} from 'node-nats-streaming'
import { randomBytes } from 'crypto'
console.clear();

const stan = nats.connect('test-cluster', randomBytes(4).toString('hex'), {
    url: 'http://localhost:5222'
});

stan.on('connect', () => {
    console.log('Listener connected to nats');

    stan.on('close', () => {
        console.log('NATS connection closed.');
        process.exit();
    });

    const options = stan.subscriptionOptions()
    .setManualAckMode(true); // used to indicate that the serve should continue sending the event to the subscribers until the msg.ack() method is called.

    const subscription = stan.subscribe('convertUnit:created', 'myqueueGroup', options);
    subscription.on('message', (msg: Message) => {
        console.log('message received: ');
        const data = msg.getData();

        if(typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()} with data: ${data}`)
        }

        // used to acknowledge receipt of the message.
        msg.ack();
    })
});


process.on('SIGNINT', () => stan.close());
process.on('SIGTERM', () => stan.close());