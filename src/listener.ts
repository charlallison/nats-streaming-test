import nats from 'node-nats-streaming'
import { TicketCreatedListener } from './events/ticket-created-listener';


console.clear();

const stan = nats.connect('test-cluster', 'client' /*randomBytes(4).toString('hex')*/, {
    url: 'http://localhost:5222'
});

stan.on('connect', () => {
    console.log('Listener connected to nats');

    stan.on('close', () => {
        console.log('NATS connection closed.');
        process.exit();
    });

    const listener = new TicketCreatedListener(stan);
    listener.listen();

    // const options = stan.subscriptionOptions()
    // .setManualAckMode(true); // used to indicate that the serve should continue sending the event to the subscribers until the msg.ack() method is called.

    // const subscription = stan.subscribe('convertUnit:created', 'myqueueGroup', options);
    // subscription.on('message', (msg: Message) => {
    //     console.log('message received: ');
    //     const data: Person[] = JSON.parse(msg.getData().toString())

    //     console.log(typeof data);
    //     console.log(data[0].title)

    //     if(typeof data === 'string') {
    //         console.log(`Received event #${msg.getSequence()} with data: ${data}`)
    //     }

    //     // used to acknowledge receipt of the message.
    //     msg.ack();
    // })
});


process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());