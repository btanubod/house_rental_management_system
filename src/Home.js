import React, { useState, useEffect } from 'react';
import Property from './Property';
import { db, storage } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll } from 'firebase/storage';

function Home(){

    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [propertyObjList, setPropertyObjList] = useState([]);

    useEffect(() => {
        Fetchdata();
    }, []);

    function Fetchdata(){

        const queryProperty = collection(db, "property");
        
        getDocs(queryProperty).then((element) => {
            const prop = element.docs.map((doc) => ({
                    data: doc.data(),
                }))
                setProperties(prop);
            });

        console.log(properties);

        const queryUsers = collection(db, "user");

        getDocs(queryUsers).then((element) => {
            const usr = element.docs.map((doc) => ({
                data: doc.data(),
            }))
            setUsers(usr);
        });
        console.log(users);
        var dupPropObjList = [];
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
            var images = [];
            const listRef = ref(storage, img_folder);
            listAll(listRef).then((res) => {
                images = res.items.forEach((itemRef) => ({
                    itemRef,
                }))
            })
            .catch(err => {
                    alert(err.message);
            })
            
            newPropertyObj.images = images;

            dupPropObjList = [...dupPropObjList, newPropertyObj];
        
        }
        setPropertyObjList(dupPropObjList);

    }  

    return(
        <div className='home'>
            <div className='home_container'>
                <div className='home_row'>
                    <Property 
                     image= "https://pngimg.com/uploads/house/house_PNG48.png"
                     address= "000 western"
                     price= {1000}
                     num_bed_rooms= {2}
                     num_wash_rooms= {2}
                     num_parking_slots= {3}
                     kitchen= {2}
                     min_lease_term= {12}
                     utilities= "All included"
                     available_from= "Jan 2023"
                     video_tour_link= ""
                     user_name= "test1"
                     user_email= "test1@gmail.com"
                     user_phone= "9876543210"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;