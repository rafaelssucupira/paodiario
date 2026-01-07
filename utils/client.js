import pkg from "whatsapp-web.js"
const { Client, MessageMedia, LocalAuth } = pkg

// https://github.com/pedroslopez/whatsapp-web.js/issues/2847
// https://github.com/pedroslopez/whatsapp-web.js/issues/2789
const client = new Client({
    authStrategy: new LocalAuth(),
	puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});
export {
	client,
	MessageMedia
}

