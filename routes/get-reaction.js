export async function sendMessage( id ) 
{
    
    const result = await fetch( "https://wppconnect.efraimsystems.com.br/api/NERDWHATS_AMERICA/reactions/" + id , 
        {
            method : "get",
            headers : { 
                "Authorization" : "Bearer $2b$10$rsih.CFDwwcYjRhiA3o.9O0q2gECLFGVMQ5aItHhrJHNObWHqAOqu" ,
                "Content-Type" : "application/json"
            }
        } )
        
    if( result.status === 200 || result.status === 201 ) 
        {
            const data = await result.json();
            return data
            
        }
    else 
        {
            return result.statusText;
        }    
}