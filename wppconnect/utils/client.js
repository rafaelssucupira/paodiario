
import { create } from "@wppconnect-team/wppconnect";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config({
    path : join( dirname(fileURLToPath(import.meta.url)), "..", ".env")
});


const client = await create({
    session : "bible",
    disableWelcome : true,
	debug: false,
    phoneNumber : process.env.NUMBER_CONNECT,
    statusFind : (sts, session) => {
        console.log("sts :", sts);
        console.log("sts :", session);

    }
});

export {
    client
}
