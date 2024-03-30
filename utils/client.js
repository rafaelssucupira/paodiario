import pkg from "whatsapp-web.js"
const { Client, LocalAuth, MessageMedia } = pkg

const client = new Client({
	authStrategy: new LocalAuth()
})

export {
	client,
	MessageMedia
}

