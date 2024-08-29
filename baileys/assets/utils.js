const fs 			= require("fs/promises");
const { resolve } = require("path")
const { loadDailyBread } = require('./loadDailyBread.js');
module.exports = class Utils {

	static async readContacts()
		{

			const URL = resolve(__dirname, './database/contacts.json');
			console.log(URL);
			const results = await fs.readFile( URL, "utf8")

			return JSON.parse(results);
		}
	static async getMessage()
		{

			const loadBible = await loadDailyBread();
			const bible = new loadBible();

			bible.setVersion( "NVI-PT" );

			const { reference, text } = await bible.votd()
			const txtFormatted = `*🍞 Pão Diário*\n\n${text}\n\n*${reference}*`
			return txtFormatted
		}

	static async sendMessages(sock) {


// 		import { CronJob } from 'cron';
// const job = new CronJob(
// 	'* * * * * *', // cronTime
// 	function () {
// 		console.log('You will see this message every second');
// 	}, // onTick
// 	null, // onComplete
// 	true, // start
// 	'America/Los_Angeles' // timeZone
// );
		const results 	= await Utils.readContacts()
		const msg 		= await Utils.getMessage()
		for ( const data of results ) {
			await sock.sendMessage( data.number, {
				text: msg,
			})
		}
	}

	static async getContacts(sock) {

		const results = await Utils.readContacts();

		const dataContacts = [];
		for ( const data of results ) {
			const result = await sock.onWhatsApp( data.phone )
			if(result.exists) {
				dataContacts.push({
					"number" : result.jid,
					"name" : data.name,
				})
			}

		}

		await fs.writeFile( resolve(__dirname, './database/contacts.json'), JSON.stringify(dataContacts) );


	}

}
