import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { activeChat } from '../../Redux/chatSlice';

const FriendList = (props) => {
    const dispatch = useDispatch()
    const db = getDatabase();
    const auth = getAuth();
    const [friendList, setFriendList] = useState([]);
    const [blockedFriends, setBlockedFriends] = useState([]);

    //fetch friend list
    useEffect(() => {
        async function fetchFriend() {
            const auth = getAuth();
            const friendRef = ref(db, 'friendList/');

            onValue(friendRef, (snapshot) => {
                const friendListArr = []
                snapshot.forEach((info) => {
                    if (auth.currentUser.uid === info.val().receiverId || auth.currentUser.uid === info.val().senderId) {
                        friendListArr.push(info.val());
                    }
                });
                setFriendList(friendListArr);
            })
        }
        fetchFriend()

    }, [])


    //Block 
    const handleBlock = (blockedName, blockedId) => {
        const db = getDatabase();
        set(push(ref(db, 'blocked/')), {
            closerId: auth.currentUser.uid,
            closerName: auth.currentUser.displayName,
            blockedId: blockedId,
            blockedName: blockedName
        })
    }

    //getBlockedFriend
    useEffect(() => {
        const db = getDatabase();
        onValue(ref(db, 'blocked/'), (snapshot) => {
            const blockedArr = []
            snapshot.forEach((info) => {
                if (auth.currentUser.uid == info.val().closerId) {
                    blockedArr.push(info.val().blockedId)
                }
            })
            setBlockedFriends(blockedArr)

        });
    }, [])

    //set the person to chat on redux
    const handleActiveChatPerson = (friend) => {
        const activeChatPerson = {}
        if (friend.senderId === auth.currentUser.uid) {
            activeChatPerson.id = friend.receiverId
            activeChatPerson.name = friend.receiverName
        } else if (friend.receiverId === auth.currentUser.uid) {
            activeChatPerson.id = friend.senderId
            activeChatPerson.name = friend.senderName
        } else {
            activeChatPerson = null
        }
        dispatch(activeChat(activeChatPerson))
    }

    return (
        <div className='friend-list'>
            <h2>Friends</h2>

            {friendList.length === 0 && <div>You have no friend!</div>}
            {
                friendList.length > 0 &&

                friendList.map((friend) => (
                    <div className='box' style={{ 'cursor': 'pointer' }} onClick={() => handleActiveChatPerson(friend)} >
                        <div className='friend-img'>
                            <img src="./assets/images/Ellipse 2.png" alt=""></img>
                        </div>
                        <div className='friend-name'>
                            <h3>{auth.currentUser.uid === friend.senderId ? friend.receiverName : friend.senderName}</h3>
                            <h4>What plans today?</h4>
                        </div>
                        <div className='time' >
                            {/* <p>{friend.date}</p> */}
                            {
                                props.term === "home" ?

                                    blockedFriends.includes(friend.senderId) || blockedFriends.includes(friend.receiverId) ?
                                        <button>Blocked</button>
                                        :
                                        <button onClick={() => handleBlock(auth.currentUser.uid === friend.senderId ? friend.receiverName : friend.senderName, auth.currentUser.uid === friend.senderId ? friend.receiverId : friend.senderId)} >Block</button>
                                    :
                                    props.term === "msg" &&

                                    <p>{friend.date}</p>
                            }

                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default FriendList