import React, { useState } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

import './AddProperty.css';

function AddProperty(){

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [InterestedProperties, setInterestedProperties] = useState([]);
    const [ListedProperties, setListedProperties] = useState([]);
    const [address, setAddress] = useState('');
    const [num_bed_rooms, setNum_bed_rooms] = useState('');
    const [num_wash_rooms, setNum_wash_rooms] = useState('');
    const [num_parking_slots, setNum_parking_slots] = useState('');
    const [kitchen, setKitchen] = useState('');
    const [price, setPrice] = useState('');
    const [utilities, setUtilities] = useState('');
    const [lease_term, setLeaseTerm] = useState('');
    const [available_from, setAvailableFrom] = useState('');
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [imageThree, setImageThree] = useState('');
    const [imageFour, setImageFour] = useState('');
    const [imageFive, setImageFive] = useState('');
    const [video_tour_link, setVideoTourLink] = useState('');

    const navigate = useNavigate();

    function submit(){
        var propertyID = -1;
        var userID = -1;
        const queryProperty = getDocs(collection(db, "property"));
        Array.prototype.forEach.call(queryProperty, (element) => {
            var data = element.data();
            if(data.id > propertyID){
                propertyID = data.id;
            }
        });

        propertyID = propertyID + 1;
        const queryUsers = getDocs(collection(db, "users"));
        Array.prototype.forEach.call(queryUsers, (element) => {
            var data = element.data();
            if(data.id > userID){
                userID = data.id;
            }
        });
        userID = userID + 1;

        const propertyDoc = (e) => {
            e.preventDefault();
            setDoc(doc(db, "properties"), {
                id: propertyID,
                user_id: userID,
                available_from: this.available_from,
                city: this.city,
                address: this.address,
                num_bed_rooms: this.num_bed_rooms,
                num_wash_rooms: this.num_wash_rooms,
                kitchen: this.kitchen,
                num_parking_slots: this.num_parking_slots,
                utilities: this.utilities,
                lease_term: this.lease_term,
                available_from: this.available_from,
                price: this.price
            });
        }

        const userDoc = (e) => {
            e.preventDefault();
            setDoc(doc(db, "users"), {
                id: userID,
                name: userName,
                email: userEmail,
                phone: userPhone,
                InterestedProperties: [],
                ListedProperties: [propertyID]
            });
        }
        
        const imgStorage = (e) => {
            e.preventDefault();

            const id = "house_" + propertyID;
            const storageRef = ref(storage, id);

            if(imageOne){
                uploadBytes(storageRef, imageOne);
            }
            if(imageTwo){
                uploadBytes(storageRef, imageTwo);
            }
            if(imageThree){
                uploadBytes(storageRef, imageThree); 
            }
            if(imageFour){
                uploadBytes(storageRef, imageFour);
            }
            if(imageFive){
                uploadBytes(storageRef, imageFive);
            }
        }

        navigate("/");
    }

    return(

        <div className='add_property'>
            <h1>Add Property:</h1>
            <form>
                <h5>Name</h5>
                <input type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                <h5>E-mail</h5>
                <input type='text' value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                <h5>Phone</h5>
                <input type='text' value={userPhone} onChange={e => setUserPhone(e.target.value)} />
                <h5>Address</h5>
                <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                <h5>Number of bed rooms:</h5>
                <input type='text' value={num_bed_rooms} onChange={e => setNum_bed_rooms(e.target.value)} />
                <h5>Number of wash rooms:</h5>
                <input type='text' value={num_wash_rooms} onChange={e => setNum_wash_rooms(e.target.value)} />
                <h5>Kitchen: </h5>
                <input type='text' value={kitchen} onChange={e => setKitchen(e.target.value)} />
                <h5>Utilities:</h5>
                <input type='text' value={utilities} onChange={e => setUtilities(e.target.value)} />
                <h5>Number of parking slots:</h5>
                <input type='text' value={num_parking_slots} onChange={e => setNum_parking_slots(e.target.value)} />
                <h5>Price</h5>
                <input type='text' value={price} onChange={e => setPrice(e.target.value)} />
                <h5>Minimum lease term: </h5>
                <input type='text' value={lease_term} onChange={e => setLeaseTerm(e.target.value)} />
                <h5>Available from: </h5>
                <input type='text' value={available_from} onChange={e => setAvailableFrom(e.target.value)} />
                <h5>Video tour link:</h5>
                <input type='text' value={video_tour_link} onChange={e => setVideoTourLink(e.target.value)} />
                <h5>Image-1:</h5>
                <input type='file' value={imageOne} onChange={e => setImageOne(e.target.value)} />
                <h5>Image-2:</h5>
                <input type='file' value={imageTwo} onChange={e => setImageTwo(e.target.value)} />
                <h5>Image-3:</h5>
                <input type='file' value={imageThree} onChange={e => setImageThree(e.target.value)} />
                <h5>Image-4: </h5>
                <input type='file' value={imageFour} onChange={e => setImageFour(e.target.value)} />
                <h5>Image-5: </h5>
                <input type='file' accept='image/*' value={imageFive} onChange={e => setImageFive(e.target.value)} />

                <button type='submit' className='submitButton' onClick={submit}>Submit</button>

            </form>

        </div>

    );

}

export default AddProperty;