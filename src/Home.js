import React, { useState } from 'react';
import Property from './Property';
import { db, storage } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home(){
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [propertyObjList, setPropertyObjList] = useState([]);

    const Fetchdata = () => {
        const queryProperty = getDocs(collection(db, "property"));
 
        Array.prototype.forEach.call(queryProperty, (element) => {
                var data = element.data();
                setProperties(arr=>[...arr, data]);
            });
            console.log(properties);

        const queryUsers = getDocs(collection(db, "users"));
        
        Array.prototype.forEach.call(queryUsers, (element) => {
                var data = element.data();
                setUsers(arr=>[...arr, data]);
            });
            console.log(users);
        for(let i=0;i<properties.length;i++){
            let newPropertyObj = {
                address: properties[i].house_num + properties[i].sub_city + properties[i].city,
                price: properties[i].price,
                num_bed_rooms: properties[i].num_bed_rooms,
                num_wash_rooms: properties[i].num_wash_rooms,
                num_parking_slots: properties[i].num_parking_slots,
                kitchen: properties[i].kitchen,
                min_lease_term: properties[i].lease_term,
                utilities: properties[i].utilities,
                available_from: properties[i].available_from,
                video_tour_link: properties[i].video_tour_link,
            };
            for(let j=0;j<users.length;j++){
                if(properties[i].user_id === users[i].id){
                    newPropertyObj.user_name = users[i].name;
                    newPropertyObj.user_email = users[i].email;
                    newPropertyObj.user_phone = users[i].phone;
                }
            }
            
            var img_folder = "house_" + properties[i].id;


            storage.ref().child(img_folder).list_All()
                .then(res => {
                    res.items.forEach((item) => {
                        setImages(arr => [...arr, item]);
                    })
                })
                .catch(err => {
                    alert(err.message);
                })
            
            newPropertyObj.images = images;

            this.setState(previousState => ({
                propertyObjList: [...previousState.propertyObjList, newPropertyObj]
            }));
        }
        console.log(propertyObjList);

    }

    return(
        <div className='home'>
            <div className='home_container'>
                <div className='home_row'>
                    <Fetchdata />
                    {propertyObjList.map(item => (
                        <Property
                            propertyObj={item}
                        />
                    ))}
                    
                </div>
            </div>
        </div>
    );
}

export default Home;