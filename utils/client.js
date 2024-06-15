import pkg from "whatsapp-web.js"
const { Client, MessageMedia, LocalAuth } = pkg

// https://github.com/pedroslopez/whatsapp-web.js/issues/2847
// https://github.com/pedroslopez/whatsapp-web.js/issues/2789
const client = new Client({
    authStrategy: new LocalAuth(),
	webVersionCache: {
		type: 'remote',
		remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
   }
});

export {
	client,
	MessageMedia
}

