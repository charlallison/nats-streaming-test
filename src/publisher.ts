import nats from 'node-nats-streaming'

console.clear();

const stan = nats.connect('test-cluster', 'clientId', {
    url: 'http://localhost:5222'
});

export interface Person {
    id: number,
    title: string,
    pay: string
};

stan.on('connect', () => {
    console.log('Publisher connected to nats');

    const data = JSON.stringify([{
        id: 123,
        title: 'Software Engineer',
        pay: 'Unknown'
    }, {
        id: '400',
        title: 'Software Engineer',
        pay: 'something big'
    }]);

    stan.publish('ticket-created', data, () => {
        console.log('message published.');
    })
});