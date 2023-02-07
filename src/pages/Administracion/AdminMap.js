import React from 'react';
import {Navigate } from "react-router-dom";

import { UserDataConsumer, UserContext } from "contexts/userData";

export default function AdminMap () { 
    const userContext = React.useContext(UserContext);


    function planClick() {
        return <Navigate to='/adminPlan' />
    }

    return (
        <UserDataConsumer>
            {context => 
                <div>
                    <h1>AdminMap</h1>
                    <button type="button" onClick={planClick}
                            className="col-offset-6 col-6 text-white text-5xl bg-orange-400 border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer 
                            transition-all transition-duration-200 hover:bg-orange-500 hover:border-primary-600 
                            active:bg-primary-700 active:border-primary-700">PLAN</button>
                </div>
            }
        </UserDataConsumer>
    );
};