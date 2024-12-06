import qrcode from "qrcode-terminal";
import { client } from "./utils/client.js";
import { Cron } from "./utils/cron.js";

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authentication', () => {
    console.log('authentication');
});

client.on('ready', async () => {
	console.log("ready");

	const cron = new Cron()
	const allContacts = cron.getContacts();
	cron.start(allContacts);
	cron.stopApp();

});


client.initialize();




