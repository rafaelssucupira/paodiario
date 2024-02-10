export async function postData( payload )
{
	try {
		const result = await fetch( "https://elohimsystems.com.br/bible/process.php",
			{
				method : "POST",
				mode : "cors",
				headers : {
					"Content-Type" : "application/json"
				},
				body : JSON.stringify( {"action": "f_select", "params" : payload } )
			} )

		if( result.status >= 200 || result.status <= 299 )
			{
				const data = await result.json();
				return data

			}
		else
			{

				throw result.status

			}
	}
	catch($err) {
		throw $err
	}

}
