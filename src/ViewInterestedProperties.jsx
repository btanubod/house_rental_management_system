import React from "react";
import './ViewInterestedProperties.css';
import InterestedProperty from './InterestedProperty';
import { useStateValue } from "./StateProvider";

function ViewInterestedProperties() {

    const [{interested, user}, dispatch] = useStateValue();

    return(
        <div className="viewinterested_title">
            <h3 className="user_style">Hello, {!user ? 'Guest' : user.email}</h3> 
            <br />
            <h2 className="heading_style"> Your interested properties: </h2>
            {interested.map((item =>
            <InterestedProperty 
            image= {item.image}
            address= {item.address}
            price= {item.price}
            num_bed_rooms= {item.num_bed_rooms}
            num_wash_rooms= {item.num_wash_rooms}
            num_parking_slots= {item.num_parking_slots}
            kitchen= {item.kitchen}
            min_lease_term= {item.min_lease_term}
            utilities= {item.utilities}
            available_from= {item.available_from}
            video_tour_link= {item.video_tour_link}
            user_name= {item.user_name}
            user_email= {item.user_email}
            user_phone= {item.user_phone}
            />
            ))}
            
        </div>
    );
}
export default ViewInterestedProperties;