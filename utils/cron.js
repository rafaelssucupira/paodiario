
import { client } from "./client.js";
import { DailyBread } from "daily-bread"
import { wwebjs } from "./wwebjs.js";
import pm2 from "pm2";

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

			const allContacts 	= await client.getContacts();
			return allContacts
				.filter(contact => contact.name && contact.name.includes("@paodiario") && contact.id.server === "c.us")
				.map(contact => ({name : contact.name, number : contact.number}) );



		}

	stopApp()
		{
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
					await this.sendMessage(data.number, this.#message )
				}


		}


}

export { Cron }

