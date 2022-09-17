import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [friendList, setFriendList] = useState([]);
    const [blockedFriends, setBlockedFriends] = useState([]);
    const [changed, setChanged] = useState(false);

    //fetch friend list
    useEffect(() => {
        async function fetchFriend() {
            const auth = getAuth();
            const friendListArr = []
            const friendRef = ref(db, 'friendList/');

            onValue(friendRef, (snapshot) => {
                snapshot.forEach((info) => {
                    if (auth.currentUser.uid === info.val().receiverId || auth.currentUser.uid === info.val().senderId) {
                        friendListArr.push(info.val());
                    }
                });
                setFriendList(friendListArr);
            })
        }
        fetchFriend()

    }, [db])


    //Block 
    const handleBlock = (blockedName, blockedId) => {
        const db = getDatabase();
        set(push(ref(db, 'blocked/')), {
            closerId: auth.currentUser.uid,
            closerName: auth.currentUser.displayName,
            blockedId: blockedId,
            blockedName: blockedName
        }).then(() => setChanged(!changed))
    }

    //getBlockedFriend
    useEffect(() => {
        const blockedArr = []
        const db = getDatabase();
        onValue(ref(db, 'blocked/'), (snapshot) => {
            snapshot.forEach((info) => {
                if (auth.currentUser.uid == info.val().closerId) {
                    blockedArr.push(info.val().blockedId)
                    setBlockedFriends(blockedArr)
                }
            })

        });
    }, [changed])



    return (
        <div className='friend-list'>
            <h2>Friends</h2>

            {friendList.length === 0 && <div>You have no friend!</div>}
            {
                friendList.length > 0 &&

                friendList.map((friend) => (
                    <div className='box' >
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
                                blockedFriends.includes(friend.senderId) || blockedFriends.includes(friend.receiverId) ?
                                    <button>Blocked</button>
                                    :
                                    <button onClick={() => handleBlock(auth.currentUser.uid === friend.senderId ? friend.receiverName : friend.senderName, auth.currentUser.uid === friend.senderId ? friend.receiverId : friend.senderId)} >Block</button>
                            }

                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default FriendList