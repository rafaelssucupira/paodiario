import { beforeEach, describe, expect, it } from 'vitest';
import { DailyBread } from "daily-bread"
describe('getMessage', () => {
	it("message !== null", async () => {
		try {
			const bible = new DailyBread();
			bible.setVersion( "NVI-PT" );

			const { reference, text } = await bible.votd()

			const txtFormatted = `*🍞 Pão Diário*\n\n${text}\n\n*${reference}*`
			const message = txtFormatted
			console.log(message)

		}
		catch($err) {
			throw new Error($err);
		}
	})

})
