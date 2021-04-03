/*
* Used to post and get data
*/
const DEBUG = true;
export async function makeRequest(data:object, apiURL:string, verb:string = "GET"):Promise<any>{

    var url = '/api/' + apiURL;

    if(DEBUG) url = "http://localhost:8080/" + url;

    const requestParams:any = {
        method:verb,

        headers:{
            'Content-type':'application/json'
        },
        redirect:"follow",
        referrerPolicy:"no-referrer",
    }

    if(verb === "POST"){
        requestParams.body = JSON.stringify(data)
    }

    const response = await fetch(url, requestParams);
    return response.json();
}