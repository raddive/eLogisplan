import Moment from 'moment';
import { wsBaseURL,empresa } from "../variables/webServicesVariables";

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

export function chechUncheckStopPoint(error,setUnset,pedido,particion)
{
    const formatDate = Moment().format('YYYY-MM-DD')
    let  params;
    if(setUnset == false)
        params = { rquest:"confirmaPedido",body:{unset:1,fecha:formatDate,codigoServicio:pedido, particion:particion, empresa:empresa}};
    else
        params = { rquest:"confirmaPedido",body:{fecha:formatDate,codigoServicio:pedido, particion:particion, empresa:empresa}};

    callWS("POST",params,error)
    .then(data =>   { 
        //console.log(data);
        return true;
    })
    .catch((error) => {
        return false;
    });


}
// 		    if(isset($inputArray->fecha) AND isset($inputArray->codigoConductor) AND isset($inputArray->codigoTractora) AND isset($inputArray->codigoCisterna) AND isset($inputArray->viaje) AND isset($inputArray->empresa)){

export function chechUncheckLoadPoint(error,setUnset,conductor,tractora,cisterna,viaje)
{

    const formatDate = Moment().format('YYYY-MM-DD')
    let  params;
    if(setUnset == false)
        params = { rquest:"confirmaCarga",body:{unset:1,fecha:formatDate,codigoConductor:conductor,codigoTractora:tractora, codigoCisterna:cisterna, viaje:viaje, empresa:"Distribucion"}};
        else
           params = { rquest:"confirmaCarga",body:{fecha:formatDate,codigoConductor:conductor,codigoTractora:tractora, codigoCisterna:cisterna, viaje:viaje, empresa:"Distribucion"}};

    callWS("POST",params,error)
    .then(data =>   { 
        //console.log(data);
        return true;
    })
    .catch((error) => {
        return false;
    });


}


export function updateBBDD(error)
{
    const formatDate = Moment().format('DD-MM-YYYY')
    const params = { rquest:"actualizaBBDD",body:{fecha:formatDate,empresa:empresa}};
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