
import {client, MessageMedia} from "./client.js"

export class wwebjs {

	async getVersion()
		{
			const version = await client.getWWebVersion();
			console.log("Whatsapp-web version : "+version);
		}

	async getChatById(to)
		{
			return await client.getChatById(to + "@c.us")
		}

	async getNumberID(number)
		{
			return await client.getNumberId(number)
		}

	async chatUnread(chatID)
		{
			const chat = await this.getChatById(chatID.replace("@c.us", ""));
			console.log( await chat.markUnread() );
		}

	getFile(filename)
		{
			return MessageMedia.fromFilePath(filename)
		}



	async sendMessage(to, body )
		{
			try
				{
					if( typeof body == undefined || body == null )
						{
							throw "mensagem undefined."
						}

					const number = await this.getNumberID(to)
					console.log("number", number);
					return await client.sendMessage( number._serialized , body);
				}
			catch(err) {
				console.error("[sendMessage] : " +err);
			}

		}

	async searchMessages(chat, limit = 1, fromMe = false)
		{

			return await chat.fetchMessages({
				limit,
				fromMe
			})

		}

}
