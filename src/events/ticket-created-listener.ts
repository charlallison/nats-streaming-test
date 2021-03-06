import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";


export class TicketCreatedListener extends Listener {
    subject = 'ticket-created';
    qeueGroupName = 'payment-service'

    onMessage(data: any, message: Message): void {
        console.log('Event data! ', data);

        message.ack();
    }

}