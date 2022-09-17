import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [stateChange, setStateChange] = useState(false)
    const [userList, setUserList] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [friendList, setFriendList] = useState([]);


    // Fetching user List
    useEffect(() => {
        const userArr = []
        const useRef = ref(db, 'users/');
        onValue(useRef, (snapshot) => {
            snapshot.forEach((user) => {
                userArr.push({
                    username: user.val().username,
                    email: user.val().email,
                    id: user.key
                })

            })
            setUserList(userArr)

        });
    }, [db])
    // console.log("userList", userList);

    // Send Friend Request
    const sendFrndReq = (eachUser) => {

        const reqListRef = ref(db, 'friendReq/');
        const newReqRef = push(reqListRef);
        set(newReqRef, {
            senderId: auth.currentUser.uid,
            senderName: auth.currentUser.displayName,
            receiverId: eachUser.id,
            receiverName: eachUser.username
        });

        setStateChange(!stateChange)
    }

    //fetch friendrequest list to recognize who sent req
    useEffect(() => {
        const friendRequestArr = []
        const frndReqRef = ref(db, 'friendReq/');
        onValue(frndReqRef, (snapshot) => {
            snapshot.forEach((data) => {
                friendRequestArr.push(data.val().receiverId + data.val().senderId)
            })
            setRequestList(friendRequestArr)
        });
    }, [])

    //fetch friendlist to recognize friend from users
    useEffect(() => {
        const friendsArray = []
        const frndsRef = ref(db, 'friendList/');
        onValue(frndsRef, (snapshot) => {
            snapshot.forEach((data) => {
                friendsArray.push(data.val().receiverId + data.val().senderId)
            })
            setFriendList(friendsArray)
        });
    }, [stateChange, db])


    return (
        <div className='user-list'>
            <h2>User List</h2>
            {
                userList.map((eachUser) => (
                    auth.currentUser.uid !== eachUser.id
                    &&
                    <div className='box' key={eachUser.id}>
                        <div className='user-img'>
                            <img src="./assets/images/Ellipse 2.png" alt=""></img>
                        </div>
                        <div className='user-name'>
                            <h3>{eachUser.username}</h3>
                            <p>{eachUser.email}</p>
                        </div>
                        <div className='button'>
                            {
                                friendList.includes(eachUser.id + auth.currentUser.uid) || friendList.includes(auth.currentUser.uid + eachUser.id) ?
                                    <button>Friend</button>
                                    :
                                    requestList.includes(eachUser.id + auth.currentUser.uid) || requestList.includes(auth.currentUser.uid + eachUser.id)
                                        ?
                                        <button><CheckIcon /></button>
                                        :
                                        <button onClick={() => sendFrndReq(eachUser)}><PersonAddIcon /></button>
                            }


                        </div>

                    </div>
                ))
            }


        </div>
    )
}

export default UserList