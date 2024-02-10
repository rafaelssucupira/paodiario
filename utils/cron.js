import { CronJob } from "cron";
import { DailyBread } from "daily-bread"
import { client } from "./client.js";
import contactsWhatsapp from "./contacts.js";
import { postData } from "./postData.js";


export class Cron
{

	#message="";

	async getMessage()
		{


			try {
				const bible = new DailyBread();
				bible.setVersion( "NVI-PT" );

				const { reference, text } = await bible.votd()
				this.#message = text

				//PASSANDO PARA O BACNO DE DADOS
				await postData( { reference, text }  );
			}
			catch($err) {
				console.log($err);
			}



		}

	async start()
		{

			const currentClass = this;

			const cron = new CronJob( "0 30 5 * * *" ,	async function()
				{
					await currentClass.getMessage(); //CAPTURAR MENSAGEM DO DIA
					for(const data of contactsWhatsapp)
						{
							currentClass.sendMessage(data.phone)

						}


				}, null, true, "America/Sao_Paulo")


		}

	formatMessage()
		{
			const { reference, text } = this.#message
			const txt = `*🍞 Pão Diário*\n\n${text}\n\n*${reference}*`

			return txt;

		}

	async sendMessage(to)
		{


			const message = this.formatMessage()

			const number = await client.getNumberId(to)

			if(message != undefined || message != null)
				{
					try {
						await client.sendMessage( number._serialized, message  )
					}
					catch(err) {
						console.log("erro para " + to + " : ", err)
					}

				}
			else {
				await client.sendMessage("558592967482@c.us", "Pão Diário não enviado para : "+to)
			}


		}





}

