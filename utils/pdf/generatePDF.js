import fs from "node:fs"
import PDFPDFument from "pdfkit"
// import { contactsWhatsapp } from "./contacts.js";

class generatePDF
{

	#pdf = null
	constructor(filename = "output.pdf", senders = [])
		{


			const PDF = new PDFPDFument({
				size : "A4",
				margin : 32
			})

			this.#pdf = PDF

			PDF
			.pipe( fs.createWriteStream(filename) );


			const BebasNeue = process.cwd() + "\/utils\/ttf\/Bebas_Neue\/BebasNeue-Regular.ttf"
			const Tahoma = process.cwd() + "\/utils\/ttf\/Tahoma\/tahoma.ttf"

			PDF.registerFont('BebasNeue', BebasNeue);
			PDF.registerFont('Tahoma', Tahoma);

			this.#printHead()
			PDF.on('pageAdded', () => this.#printHead() );

			for(const [ index, data ] of Object.entries(senders))
				{
					const ITERATOR = parseInt(index) + 1

					PDF.markContent('Code');
					PDF
					.text(`${ITERATOR}. ${data.name} - ${data.timestamp}`, {
						align : "center"
					})
					.moveDown('0.5')

					PDF.endMarkedContent()
				}

			PDF.end();
		}

	 #printHead()
		{
			const PDF = this.#pdf;
			const URL = process.cwd() + "\/utils\/img\/bible.png"


			PDF.
			image(URL, 70, 10,  { width: 90 })

			PDF
			.font("BebasNeue")
			.fontSize(24)
			.text("CONTATOS", {
				align : "center"
			})
			.moveDown()
			.fontSize(10)
			.moveDown();

			PDF
			.font("Tahoma")
			.fontSize(12)
		}

}

export {
	generatePDF
}
