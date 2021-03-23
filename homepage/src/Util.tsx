const DEBUG = true;

async function makeRequest(data:object, apiURL:string, verb:string = "GET"):Promise<object>{

    var url = '/api/' + apiURL;
    if(DEBUG){
        url = 'http://localhost:8080/api/' + apiURL
    }
    

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



const _ = {
    makeRequest
}

export default makeRequest;

/*
        mode:"no-cors",
        cache:"no-cache",
        credentials:'same-origin',
        */