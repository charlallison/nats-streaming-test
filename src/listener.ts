import nats, {Message} from 'node-nats-streaming'
import { randomBytes } from 'crypto'
console.clear();

const stan = nats.connect('test-cluster', randomBytes(4).toString('hex'), {
    url: 'http://localhost:5222'
});

stan.on('connect', () => {
    console.log('Listener connected to nats');

    const subscription = stan.subscribe('convertUnit:created');
    subscription.on('message', (msg: Message) => {
        console.log('message received: ');
        const data = msg.getData();

        if(typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()} with data: ${data}`)
        }
    })
});