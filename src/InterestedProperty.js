import React from 'react'
import './InterestedProperty.css';
import Button from '@material-ui/core/Button';
import { useStateValue } from './StateProvider';

function InterestedProperty(propertyObj){

    const [interested, dispatch] = useStateValue();

    const removePropertyFromInterestedList = () => {

        dispatch({
            type: 'REMOVE_FROM_INTERESTED',
            item:{
              propertyObj: propertyObj,
            },
        });
    };

    return(
        <div className='interested'>
            <div className='property_images'>
            {propertyObj.images.map(image =>(<img src={image} alt=""></img>))}
            </div>

            <div className='property_details'>
                <p>
                    <strong> propertyObj.address </strong>
                </p>
                <p className='property_price'>
                    <strong>Rent: $</strong>
                    <small>propertyObj.price per month</small>
                </p>
            </div>
            <div className='property_details_2'>
                <p>
                    <h3>LandLord Details:</h3>
                    <small>Name: {propertyObj.user_name}</small>
                    <small>Email: {propertyObj.user_email}</small>
                    <small>Mobile: {propertyObj.user_phone}</small>
                    <br></br>
                    <h3>Property Details</h3>
                    <small>Number of Bedrooms: {propertyObj.num_bed_rooms}</small>
                    <small>Number of washrooms: {propertyObj.num_wash_rooms}</small>
                    <small>kitchen: {propertyObj.kitchen}</small>
                    <small>Number of parking slots: {propertyObj.num_parking_slots}</small>
                    <small>Utilities: {propertyObj.utilities}</small>
                    <small>Minimim lease term: {propertyObj.lease_term}</small>
                    <small>Available from: {propertyObj.available_from}</small>
                    <small>Video tour link: {propertyObj.video_tour_link}</small>
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