
import { client } from "./client.js";
import { DailyBread } from "daily-bread"
import { wwebjs } from "./wwebjs.js";
import pm2 from "pm2";

import { setTimeout } from "node:timers/promises"

class Cron extends wwebjs
{

	#message="";

	constructor() {
		super()
	}

	async getMessage()
		{
			try {
				const bible = new DailyBread();
				bible.setVersion( "NVI-PT" );

				const { reference, text } = await bible.votd()

				const txtFormatted = `*🍞 Pão Diário*\n\n${text}\n\n*${reference}*`
				this.#message = txtFormatted

			}
			catch($err) {
				throw new Error($err);
			}

		}

	async getContacts()
		{

			// const allContacts 	= await client.getContacts();
			// let i = 0
			// const result = []
			// for(const data of allContacts) {
			// 	if(data.name && data.name.includes("@paodiario")) {
			// 		console.log(data.name)
			// 		result.push({name : data.name, phone : data.);
			// 	}

			// }
			// console.log(result.length);


			const allContacts       = await client.getContacts();
			const result 			= 	allContacts
								.filter(contact => contact.name && contact.name.includes("@paodiario") && contact.id.server === "c.us")
								.map(contact => ({name : contact.name, number : contact.number}) )

			return result
			// console.log(allContacts.length);
			// const filteredContacts = allContacts.filter(contact => contact.id.server === "c.us" );
			// console.log(filteredContacts.length);

			// const resultFinally = allContacts.reduce( (acc, current) => {
			// 	if(current.id.server === "c.us" && current.name && current.name.includes("@paodiairo") === true)
			// 		{
			// 			if(acc.includes( current.id._serialized ) === false )
			// 				{
			// 					acc.push(current.id._serialized);
			// 				}
			// 		}

			// 	return acc;
			// }, [] )

			// console.log(resultFinally.length);


		// 	console.log(filteredContacts.length);
		// 	const ct =  allContacts
		// 		.filter(contact => contact.name && contact.name.includes("@paodiario"))
		// 		.map(contact => ({...contact}) );

		// console.log(ct.length);

		}

	stopApp()
		{
			console.log("stopApp");

			pm2.list( function(err, list) {
				for(const data of list)
				{
					if(data.name === "paodiario")
						{
							pm2.stop(data.name, (err, proc) => {
								if(err) console.log(err);
								console.log(proc[0]["name"] + " - status : " + proc[0]["status"])
							})
						}
				}
			})
		}

	async start(contacts)
		{
			await this.getMessage();
			for(const data of contacts)
				{
					await setTimeout(1000);
					console.log(data.name);
					await this.sendMessage(data.number, this.#message )
				}


		}


}

export { Cron }

