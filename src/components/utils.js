import Moment from 'moment';

export function callWS(type,params,sError)
{
    let url = new URL(process.env.REACT_APP_WS_BASE_URL);
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
            else if(res.status === 204) 
                throw new Error("NO DATA");
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
    if(setUnset === false)
        params = { rquest:"confirmaPedido",body:{unset:1,fecha:formatDate,codigoServicio:pedido, particion:particion, empresa:process.env.REACT_APP_EMPRESA}};
    else
        params = { rquest:"confirmaPedido",body:{fecha:formatDate,codigoServicio:pedido, particion:particion, empresa:process.env.REACT_APP_EMPRESA}};

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
    if(setUnset === false)
        params = { rquest:"confirmaCarga",body:{unset:1,fecha:formatDate,codigoConductor:conductor,codigoTractora:tractora, codigoCisterna:cisterna, viaje:viaje, empresa:process.env.REACT_APP_EMPRESA}};
        else
           params = { rquest:"confirmaCarga",body:{fecha:formatDate,codigoConductor:conductor,codigoTractora:tractora, codigoCisterna:cisterna, viaje:viaje, empresa:process.env.REACT_APP_EMPRESA}};

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
    const params = { rquest:"actualizaBBDD",body:{fecha:formatDate,empresa:process.env.REACT_APP_EMPRESA}};
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

export function changeTheme(bDark){
    if(bDark===true || bDark===false)  
    {
        localStorage.setItem("eLogisplan-DarkMode", bDark);
        let themeLink = document.getElementById('theme-link');
        if (themeLink) {
            if(bDark===false)
                themeLink.href = "themes/orange-light.css";
            else
                themeLink.href = "themes/orange-dark.css";
        }
    }
}