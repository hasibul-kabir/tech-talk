import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import NotificationList from './NotificationList';

const MyNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    //////////////****HERE IS A BUG */

    //fetch notification
    useEffect(() => {
        const db = getDatabase();
        const auth = getAuth();
        onValue(ref(db, 'notifications/' + 'friendReq'), (snapshot) => {
            let arr = [];
            snapshot.forEach(element => {
                if (element.val().receiverId === auth.currentUser.uid) {
                    arr.push({
                        friendReqName: element.val().senderName
                    })
                }
            })
            setNotifications(arr);
        });

        onValue(ref(db, 'notifications/' + 'groupReq'), (snapshot) => {
            let arr = [];
            snapshot.forEach(element => {
                if (element.val().adminId === auth.currentUser.uid) {
                    arr.push({
                        groupReqName: element.val().senderName
                    })
                }
            })
            setNotifications((prev) => [...prev, ...arr]);
        });
    }, [])

    return (
        <div className='notifications'>
            <div className='top-part'>
                <h2>Notifications</h2>
            </div>
            <NotificationList notifications={notifications} />
        </div>
    )
}

export default MyNotifications