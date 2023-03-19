import express from "express";
import { validate } from "./CpfValidator";
import pgp from "pg-promise";
import { checkout } from "./application";
const app = express();
app.use(express.json());


app.post("/checkout", async function (req, res) {
	const input = req.body;
	try{
		const output = await checkout(input);
		res.json(output);
	} catch (error: any) {
		res.status(422).json({
			message: error.message
		});
	}
});
app.listen(3000);
