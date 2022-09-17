import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendReq = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [stateChanged, setStateChanged] = useState(false)
    const [friendReqs, setFriendReqs] = useState([]);

    //Fetch friend request info.
    useEffect(() => {
        const reqList = []
        const frndReqRef = ref(db, 'friendReq/');
        onValue(frndReqRef, (snapshot) => {
            snapshot.forEach((data) => {
                if (auth.currentUser.uid === data.val().receiverId) {
                    reqList.push({
                        friendReqKey: data.key,
                        senderId: data.val().senderId,
                        senderName: data.val().senderName,
                        receiverId: data.val().receiverId,
                        receiverName: data.val().receiverName
                    })
                }
            })
            setFriendReqs(reqList)
        });
    }, [db, auth.currentUser.uid, stateChanged])

    // Handle Accept Friend Request
    function acceptFrndReq(friendReq) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const friendListRef = ref(db, 'friendList/');
        const newFrndListRef = push(friendListRef);
        set(newFrndListRef, {
            // id: friendReq.friendReqKey,
            senderId: friendReq.senderId,
            senderName: friendReq.senderName,
            receiverId: friendReq.receiverId,
            receiverName: friendReq.receiverName,
            date: `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()}`
        })
            .then(remove(ref(db, 'friendReq/' + friendReq.friendReqKey)))
            .then(setStateChanged(!stateChanged))
    }



    return (
        <div className='friend-req'>
            <h2>Friend  Request</h2>
            {
                friendReqs.length > 0 ?

                    friendReqs.map((friendReq) => (

                        <div className='box' >
                            <div className='req-img'>
                                <img src="./assets/images/Ellipse 2.png" alt=""></img>
                            </div>
                            <div className='req-name'>
                                <h3>{friendReq.senderName}</h3>
                                <h4>What plans today?</h4>
                            </div>
                            <div className='button'>
                                <button onClick={() => acceptFrndReq(friendReq)} >Accept</button>
                            </div>
                        </div>
                    ))
                    :
                    <h6 style={{ 'textAlign': 'center' }}>No Friend Request</h6>
            }
        </div>
    )
}

export default FriendReq