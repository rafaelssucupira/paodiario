import { CronJob } from "cron";
import { DailyBread } from "daily-bread"
import contacts from "./data/contacts.json" assert { type: 'json' }
import { wwebjs } from "./wwebjs.js";
import 'dotenv/config'

class Cron extends wwebjs
{

	#message="";

	constructor() {
		super()
		this.getVersion();
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

	async start()
		{

			if(process.env.AMBIENTE == "production")
				{
					const Cron = new CronJob( "0 0 7 * * *" , async () =>
						{
							await this.getMessage();

							for(const data of contacts)
								{
									await this.sendMessage(data.phone, this.#message )
								}

						}, null, true, "America/Sao_Paulo")
				}
			else
				{
					await this.getMessage();
					await this.sendMessage("558591100290", this.#message )

				}



		}


}

export { Cron }

