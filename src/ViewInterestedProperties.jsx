import React from "react";
import './ViewInterestedProperties.css';
import InterestedProperty from './InterestedProperty';
import { useStateValue } from "./StateProvider";

function ViewInterestedProperties() {

    const [{interested, user}, dispatch] = useStateValue();

    return(
        <div className="viewinterested_title">
            <h3>Hello, {!user ? 'Guest' : user.email}</h3>
            <h2> Your interested properties: </h2>
            {interested.map((item =>
            <InterestedProperty 
                propertyObj={item}
            />
            ))}
            
        </div>
    );
}
export default ViewInterestedProperties;