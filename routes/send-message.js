export async function sendMessage( payload )
{

    const result = await fetch( "https://wppconnect.efraimsystems.com.br/api/RAFAEL_7482/send-message",
        {
            method : "post",
            headers : {
                "Authorization" : "Bearer $2b$10$EP4MIlDqOtaOPZzkGlLMcOdu_oSfrmq3OQ5bHtgrFRoCt8O5AxPyq" ,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(payload)
        } )

    if( result.status === 200 || result.status === 201 )
        {
            const data = await result.json();
            return data

        }
    else
        {
            return result.status;
        }
}
