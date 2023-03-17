import amqp from "amqplib";

async function init () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("checkout", { durable: true });
    await channel.consume("checkout", async function (msg:any) {
        console.log(msg.content.toString());
        channel.ack(msg);
    });
}
init();