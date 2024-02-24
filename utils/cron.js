import { CronJob } from "cron";
import { DailyBread } from "daily-bread"
import { client } from "./client.js";
import { contactsWhatsapp } from "./contacts.js";
import { postData } from "./postData.js";

import 'dotenv/config'



export class Cron
{

	#message="";

	async getMessage()
		{


			try {
				const bible = new DailyBread();
				bible.setVersion( "NVI-PT" );

				const { reference, text } = await bible.votd()
				this.#message = { reference, text }

				//PASSANDO PARA O BACNO DE DADOS
				await postData( { reference, text }  );
			}
			catch($err) {
				console.log($err);
			}



		}

	formatMessage()
		{
			const { reference, text } = this.#message
			const txt = `*🍞 Pão Diário*\n\n${text}\n\n*${reference}*`

			return txt;

		}

	async sendReportLastMessage()
		{
			let text = "";
			for(const data of contactsWhatsapp)
				{
					try {
						const timestamp = await this.getTime(data.phone);
						text += data.name + " - "+ timestamp +"\n"
					}
					catch($err) {
						text += data.name + " - "+ "null" +"\n"
					}


				}

			await client.sendMessage(process.env.MY_NUMBER, text)

		}

	async getTime(phone)
		{
			const number 		= await client.getNumberId(phone)
			const chat		 	= await client.getChatById(number._serialized)


			const message = await chat.fetchMessages({ //query message
				limit : 1,
				fromMe : false
			})


			if(message.length == 0)
				{
					return "empty"
				}
			else
				{

					const lastMessage 	= new Date( (message[0]["timestamp"] * 1000) )
					const day = lastMessage.getDate().toString().padStart(2,"0")
					const month = (lastMessage.getMonth() +1).toString().padStart(2, "0");

					return `${day}/${month} [${lastMessage.getHours()}:${lastMessage.getMinutes()}]`
				}

		}


	delay(miliseconds)
		{
			return new Promise(function(resolve) {
				setTimeout(function(){
					resolve();
				}, miliseconds)
			})

		}



	async start()
		{

			const currentClass = this;

			const cron = new CronJob( "0 0 7 * * *" ,	async function()
				{
					await currentClass.getMessage(); //CAPTURAR MENSAGEM DO DIA
					for(const data of contactsWhatsapp)
						{

							await this.delay(15000);
							currentClass.sendMessage(data.phone)

						}

					currentClass.sendReportLastMessage()
				}, null, true, "America/Sao_Paulo")


		}



	async sendMessage(to)
		{
			const message = this.formatMessage()
			const chat = await client.getChatById(to + "@c.us")



			if(message.includes(undefined) == false || message.includes(null) == false)
				{
					try {

						await chat.sendStateTyping() //produz 25 segundos de delay
						await client.sendMessage( chat.to, message  )
					}
					catch(err) {
						console.log("erro para " + to + " : ", err)
						await client.sendMessage(process.env.MY_NUMBER, "Pão Diário não enviado para : "+to)
					}

				}

		}





}

