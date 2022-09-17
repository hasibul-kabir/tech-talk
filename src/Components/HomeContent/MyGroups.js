import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

const MyGroups = () => {
    const [groupData, setGroupData] = useState([]);
    const [change, setChange] = useState(false);
    const db = getDatabase();
    const auth = getAuth();

    useEffect(() => {
        const arr = []
        onValue(ref(db, 'groups/'), (snapshot) => {
            // const data = snapshot.val();
            snapshot.forEach(element => {
                element.val().adminId == auth.currentUser.uid &&
                    arr.push({
                        groupName: element.val().groupName,
                        groupTagline: element.val().groupTagline,
                        adminName: element.val().adminName
                    })
                setGroupData(arr)
            });
        });

    }, [])
    return (
        <div className='my-groups'>
            <h2>My Groups</h2>
            {
                groupData.map((element) => (
                    <div className='box' >
                        <div className='group-img'>
                            <img src="./assets/images/Ellipse 2.png" alt=""></img>
                        </div>
                        <div className='group-name'>
                            <h3>{element.groupName}</h3>
                            <h4>{element.groupTagline}</h4>
                        </div>
                        <div className='time' >
                            <p>29 aug 2022</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MyGroups