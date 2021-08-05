import {Stan, Message } from 'node-nats-streaming';

export abstract class Listener {
    abstract subject: string;
    abstract qeueGroupName: string;
    private client: Stan;
    protected ackWait = 5 * 1000;
    abstract onMessage(data: any, message: Message): void;

    constructor(client: Stan) {
        this.client = client;
        console.log('listener...');
    }

    subscriptionOptions() {
        //return this.client
        //.subscriptionOptions()
        //.setDeliverAllAvailable()
        //.setManualAckMode(true)
        //.setAckWait(this.ackWait)
        //.setDurableName(this.qeueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(this.subject, this.qeueGroupName);
        subscription.on('message', (message: Message) => {
            console.log(`Message received: ${this.subject} / ${this.qeueGroupName}`);
            const data = this.parseMessage(message);
            this.onMessage(data, message);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'));
    }

}