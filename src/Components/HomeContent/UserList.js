import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [userList, setUserList] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [friendList, setFriendList] = useState([]);


    // Fetching user List
    useEffect(() => {
        const useRef = ref(db, 'users/');
        onValue(useRef, (snapshot) => {
            const userArr = []
            snapshot.forEach((user) => {
                userArr.push({
                    username: user.val().username,
                    email: user.val().email,
                    id: user.key
                })

            })
            setUserList(userArr)

        });
    }, [])
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

        set(push(ref(db, 'notifications/' + 'friendReq')), {
            senderId: auth.currentUser.uid,
            senderName: auth.currentUser.displayName,
            receiverId: eachUser.id,
            receiverName: eachUser.username
        })

    }

    //fetch friendrequest list to recognize who sent req
    useEffect(() => {
        const frndReqRef = ref(db, 'friendReq/');
        onValue(frndReqRef, (snapshot) => {
            const friendRequestArr = []
            snapshot.forEach((data) => {
                friendRequestArr.push(data.val().receiverId + data.val().senderId)
            })
            setRequestList(friendRequestArr)
        });
    }, [])

    //fetch friendlist to recognize friend from users
    useEffect(() => {
        const frndsRef = ref(db, 'friendList/');
        onValue(frndsRef, (snapshot) => {
            const friendsArray = []
            snapshot.forEach((data) => {
                friendsArray.push(data.val().receiverId + data.val().senderId)
            })
            setFriendList(friendsArray)
        });
    }, [])


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
                            <h3 title={eachUser.username}>{eachUser.username.length > 7 ? eachUser.username.slice(0, 7) + '...' : eachUser.username}</h3>
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