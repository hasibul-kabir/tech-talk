import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from "firebase/database";

const BlockedUser = () => {
    const auth = getAuth();
    const [blockedFriends, setBlockedFriends] = useState([]);
    const [changed, setChanged] = useState(false);

    //Fetch blocked friends
    useEffect(() => {
        const db = getDatabase();
        onValue(ref(db, 'blocked/'), (snapshot) => {
            const blockedArr = []
            snapshot.forEach((info) => {
                if (auth.currentUser.uid == info.val().closerId) {
                    blockedArr.push({
                        key: info.key,
                        closerId: info.val().closerId,
                        closerName: info.val().closerName,
                        blockedId: info.val().blockedId,
                        blockedName: info.val().blockedName
                    })
                }
            })
            setBlockedFriends(blockedArr)
        });
    }, [])

    const handleUnblock = (key) => {
        const db = getDatabase();
        remove(ref(db, 'blocked/' + key))
    }
    return (
        <div className='blocked-users'>
            <h2>Blocked Users</h2>
            {blockedFriends.length === 0 && <div>No Blocked User!</div>}
            {
                blockedFriends.length > 0 &&
                blockedFriends.map((info) => (
                    <div className='box'>
                        <div className='user-img'>
                            <img src="./assets/images/Ellipse 2.png" alt=""></img>
                        </div>
                        <div className='user-name'>
                            <h3>{info.blockedName}</h3>
                            <p>name@gmail.com</p>
                        </div>
                        <div className='button'>
                            <button onClick={() => handleUnblock(info.key)} >Unblock</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BlockedUser