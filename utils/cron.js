import { CronJob } from "cron";
import { DailyBread } from "daily-bread"
import contacts from "./../contacts.json" assert { type: 'json' }
import { wwebjs } from "./wwebjs.js";
import 'dotenv/config'

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

	stopApp()
		{
			pm2.list( function(err, list) {
				for(const data of list)
				{
					if(data.name === "@paodiario")
						{
							pm2.delete(data.name, (err, proc) => {
								if(err) console.log(err);
								console.log(proc[0]["name"] + " - status : " + proc[0]["status"])
							})
						}
				}
			})
		}

	async start()
		{
			await this.getMessage();
			for(const data of contacts)
				{
					await this.sendMessage(data.phone, this.#message )
				}
		}


}

export { Cron }

