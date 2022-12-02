import React from 'react'
import './InterestedProperty.css';
import Button from '@material-ui/core/Button';
import { useStateValue } from './StateProvider';

function InterestedProperty({image, address, price, num_bed_rooms, num_wash_rooms, num_parking_slots, kitchen, min_lease_term, utilities, available_from, video_tour_link, user_name, user_email, user_phone}){

    const [interested, dispatch] = useStateValue();

    const removePropertyFromInterestedList = () => {

        dispatch({
            type: 'REMOVE_FROM_INTERESTED',
            item:{
                image: image,
                address: address,
                price: price,
                num_bed_rooms: num_bed_rooms,
                num_wash_rooms: num_wash_rooms,
                num_parking_slots: num_parking_slots,
                kitchen: kitchen,
                min_lease_term: min_lease_term,
                utilities: utilities,
                available_from: available_from,
                video_tour_link: video_tour_link,
                user_name: user_name,
                user_email: user_email,
                user_phone: user_phone
            },
        });
    };

    return(
        <div className='interested'>
            <div className='intrested_property_image'>
            <img src={image} alt=""></img>
            </div>

            <div className='interested_property_details'>
                <p>
                    <strong>{address}</strong> <br />
                </p>
                <p className='property_price'>
                    <strong>Rent: $</strong>
                    <small>{price} per month</small> <br />
                </p>
                <p>
                    <h4>LandLord Details:</h4>
                    <small>Name: {user_name}</small> <br />
                    <small>Email: {user_email}</small> <br />
                    <small>Mobile: {user_phone}</small> <br />
                    <br></br>
                    <h4>Property Details</h4>
                    <small>Number of Bedrooms: {num_bed_rooms}</small> <br />
                    <small>Number of washrooms: {num_wash_rooms}</small> <br />
                    <small>kitchen: {kitchen}</small> <br />
                    <small>Number of parking slots: {num_parking_slots}</small> <br />
                    <small>Utilities: {utilities}</small> <br />
                    <small>Minimim lease term: {min_lease_term}</small> <br />
                    <small>Available from: {available_from}</small> <br />
                    <small>Video tour link: {video_tour_link}</small><br />
                    <br />
                </p>
            </div>

            <div className='remove_from_intr_btn'>
                <Button variant='contained' onClick={removePropertyFromInterestedList} color='secondary'>
                    REMOVE FROM INTERESTED LIST
                </Button>
            </div>
        </div>
    );
}

export default InterestedProperty;