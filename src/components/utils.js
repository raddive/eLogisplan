import Moment from 'moment';
import { wsBaseURL } from "../variables/webServicesVariables";

export function callWS(type,params,sError)
{
    let url = new URL(wsBaseURL);
    let requestOptions = {}
   
    if(type==="GET")
    {
        requestOptions = {
            method: 'GET',
        };
        url.search = new URLSearchParams(params);
    }
    else if (type==="POST")
    {
        url+="?rquest="+params.rquest;
        requestOptions = {
            method: 'POST',
            body: JSON.stringify(params.body)
        };
    }

    return new Promise(function(resolve, reject) {
        fetch(url,requestOptions)
        .then(res =>{
            if(res.status === 503) 
                throw new Error("El servicio MySQL no responde");
            else if(res.status >= 400) 
                throw new Error("El servidor ha respondido con un error");
                resolve(res.json());
        })
        .catch((error) => {
            reject(sError = error.message);
        }); 
    })
};

export function updateBBDD(error)
{
    const formatDate = Moment().format('DD-MM-YYYY')
    const params = { rquest:"actualizaBBDD",body:{fecha:formatDate,empresa:"Distribucion"}};
    callWS("POST",params,error)
    .then(data =>   { 
        //console.log(data);
        return true;
    })
    .catch((error) => {
        return false;
    });
}




export function HHMM_to_String(HHMM)
{
    const hh=Math.floor(HHMM/100<10)?"0"+Math.floor(HHMM/100):Math.floor(HHMM/100);
    const mm=HHMM%100<10?"0"+HHMM%100:HHMM%100;

    return hh+":"+mm;
}