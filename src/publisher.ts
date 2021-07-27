import nats from 'node-nats-streaming'

console.clear();

const stan = nats.connect('test-cluster', 'clientId', {
    url: 'http://localhost:5222'
})

stan.on('connect', () => {
    console.log('Publisher connected to nats');

    const data = JSON.stringify({
        id: '123',
        title: 'Software Engineer',
        pay: 'Unknown'
    });

    stan.publish('convertUnit:created', data, () => {
        console.log('message published.');
    })
});