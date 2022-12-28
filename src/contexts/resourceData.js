import React,{useState} from "react"
import {Navigate } from "react-router-dom";

const {Consumer} = React.createContext()
const ResourceContext = React.createContext(undefined);

function ResourceDataProvider(props) {

    const [resourceData, setResourceData] = useState({conductor:"",tractora:"",cisterna:""});
    function setResource(newItem)
    {
        setResourceData({conductor:newItem.CodigoConductor, 
                         tractora:newItem.CodigoTractora,
                         cisterna:newItem.CodigoCisterna}
        );
    };

    return (
        <ResourceContext.Provider value={{resourceData,setResource}}>
              {props.children}
        </ResourceContext.Provider>    
    )
}

export {ResourceDataProvider, ResourceContext, Consumer as  ResourceDataConsumer}