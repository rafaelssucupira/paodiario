const makeWASocket 				= require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const logger 					= require("./assets/logger.js");
const Utils					= require("./assets/utils.js");
const { loadCron } = require("./assets/loadCron.js");

async function connectToWhatsApp () {

	const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
	const sock = makeWASocket({
        auth	: state,
		printQRInTerminal	: true,
		logger
    });

	sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
		sock.logger.error(update)
		const { connection, lastDisconnect } = update

        if(connection === 'close') {

			const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            sock.logger.info('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if(shouldReconnect) {
                connectToWhatsApp()
            }

        }
		else if(connection === 'open')
		{

		   const CronJob	= await loadCron();
		   new CronJob(
				"0 0 7 * * *",
				function() {
					console.log("HAHAHAHHAHA");
					Utils.sendMessages(sock)
				},
				null,
				true,
				"America/Sao_Paulo"
			)

			//    field          allowed values
			// 	-----          --------------
			// 	second         0-59
			// 	minute         0-59
			// 	hour           0-23
			// 	day of month   1-31
			// 	month          1-12 (or names, see below)
			// 	day of week    0-7 (0 or 7 is Sunday, or use names)


        }
    })

}

connectToWhatsApp()
