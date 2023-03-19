import amqp from "amqplib";
import { validate } from "./CpfValidator";
import pgp from "pg-promise";
import { checkout } from "./application";

async function init () {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
	const connectionQueue = await amqp.connect("amqp://localhost");
	const channel = await connectionQueue.createChannel();
	await channel.assertQueue("checkout", { durable: true });
    await channel.consume("checkout", async function (msg:any) {
        const input = JSON.parse(msg.content.toString());
        try{
            const output = await checkout(input);
            console.log(output);
        }catch (error : any){
            console.log(error.message);
        }
        channel.ack(msg);
    
    });
}
init();