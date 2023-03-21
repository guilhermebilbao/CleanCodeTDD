import amqp from "amqplib";
import { execute } from "./Checkout";

async function init () {
	const connectionQueue = await amqp.connect("amqp://localhost");
	const channel = await connectionQueue.createChannel();
	await channel.assertQueue("checkout", { durable: true });
    await channel.consume("checkout", async function (msg:any) {
        const input = JSON.parse(msg.content.toString());
        try{
            const output = await execute(input);
            console.log(output);
        }catch (error : any){
            console.log(error.message);
        }
        channel.ack(msg);
    
    });
}
init();