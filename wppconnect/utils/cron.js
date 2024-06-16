import { CronJob } from "cron";
import { DailyBread } from "daily-bread"
import { contactsWhatsapp } from "./contacts.js";
import 'dotenv/config'
import { SQL } from "./SQL.js";
import { schemaVer } from "./schemas/ver.js";
import { client } from "./client.js";

class Cron
{

	#message="";

	constructor() {
		// super()
		// this.getVersion();
	}

	async getMessage()
		{
			try {
				const bible = new DailyBread();
				bible.setVersion( "NVI-PT" );

				const { reference, text } = await bible.votd()

				//await this.syncDb( reference, text );

				const txtFormatted = `*🍞 Pão Diário*\n\n${text}\n\n*${reference}*`
				this.#message = txtFormatted

			}
			catch($err) {
				console.log("[getMessage]", $err);
			}

		}
	async syncDb(reference, text)
		{

			const conn = new SQL(process.env.BANCO_IP, process.env.BANCO_ADMIN, process.env.BANCO_USER, process.env.BANCO_PASSWD);
			const isConnected = await conn.isConnected()
			if(isConnected) {
				try {
					const modelVer 	= await conn.defineModel("ver", schemaVer)
					const result 	= await conn.insert( modelVer, { ver_referencia: reference, ver_texto: text } )
					console.log("syncDb : OK");
				}
				catch($err) {
					console.log("[syncDb]", $err);
					await this.sendMessage(process.env.MY_NUMBER, "❌ paodiario : Erro ao inserir no banco de dados" );
					await this.chatUnread( process.env.MY_NUMBER );

				}


			}
		}

	async start()
		{

			if(process.env.AMBIENTE == "prod")
				{
					new CronJob( "0 0 7 * * *" , async () =>
						{
							await this.getMessage();

							for(const data of contactsWhatsapp)
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

	async sendMessage(id) {
		console.log(id);
		if( id.includes("@c.us") === true ) {
			await client.sendText( id, this.#message )
		}
		else {
			await client.sendText( id+"@c.us", this.#message )
		}

	}

}

export { Cron }

