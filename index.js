
import qrcode from "qrcode-terminal";
import { client } from "./utils/client.js";
import { Cron } from "./utils/cron.js";

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authentication', () => {
    console.log('authentication');
});

client.on('ready', () => {
	console.log("ready version 1.2");

	const cron = new Cron()
	cron.start();
});


client.initialize();





