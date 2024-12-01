# Bot em wwebjs
Este é um bot para WhatsApp desenvolvido para enviar versículos da Bíblia automaticamente todos os dias, às 7 horas da manhã. O bot visa fornecer uma palavra de conforto e inspiração diária aos usuários, com uma seleção de versículos aleatórios ou programados, de acordo com a configuração da aplicação.

## Tecnologias Utilizadas
- Node.js: Utilizado para a criação do bot e a lógica de programação.
- WhatsApp API (whatsapp-web.js): Para o envio de mensagens via WhatsApp.
- Biblioteca de Agendamento (Ex.: node-cron): Para garantir que o envio do versículo aconteça pontualmente às 7h da manhã todos os dias.

## Funcionalidades
1. Envio diário de versículos: O bot envia automaticamente versículos bíblicos todos os dias às 7h da manhã.
2. Personalização: Possibilidade de enviar versículos de diferentes livros ou temas.
3. Interação com o usuário: Os usuários podem interagir com o bot para receber versículos específicos ou pedir oração.
4. Agendamento flexível: O envio pode ser ajustado para diferentes horários ou intervalos, caso desejado.

## Instalação
Clone o repositório:
```
git clone https://github.com/rafaelssucupira/bible.git
```


Instale as dependências:
`npm install`

Criar arquivo `contacts.json` seguindo o seguinte modelo :
```
[
	{ "phone" : "5585xxxx-xxxx", "name" : "xxx" },
	...
]
```

Inicie o bot:
`npm start`
