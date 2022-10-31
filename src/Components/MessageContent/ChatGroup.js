import './chatGroup.css'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from 'react-redux'
import { activeChat } from '../../Redux/chatSlice';

const ChatGroup = () => {
    const dispatch = useDispatch();
    const [groups, setGroups] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const auth = getAuth();
    const db = getDatabase();



    useEffect(() => {
        onValue(ref(db, 'groupMember/'), (snapshot) => {
            let arr = [];
            snapshot.forEach(element => {
                if (element.val().adminId === auth.currentUser.uid || element.val().senderId === auth.currentUser.uid) {
                    arr.push(element.val().groupId)
                } else {
                    return
                }
            });
            setGroups(arr);
        });
    }, [])


    useEffect(() => {
        onValue(ref(db, 'groups/'), (snapshot) => {
            const arr = []
            snapshot.forEach(element => {
                arr.push({
                    groupName: element.val().groupName,
                    groupId: element.key,
                    groupTagline: element.val().groupTagline,
                    adminName: element.val().adminName,
                    adminId: element.val().adminId
                })
            });
            setGroupData(arr)
        });
    }, [])


    //set the person to chat on redux
    const handleActiveChatGroup = (element) => {
        const groupInfo = {
            status: 'groupChat',
            groupName: element.groupName,
            groupId: element.groupId,
            adminId: element.adminId
        }
        dispatch(activeChat(groupInfo));

    }
    return (
        <div className='chatgroup-list'>
            <div className='heading'>
                <h2>Groups List</h2>
            </div>
            {
                groupData.map((element) =>
                    groups.includes(element.groupId) &&
                    <div className='box' onClick={() => handleActiveChatGroup(element)} >
                        <div className='group-img'>
                            <img src="./assets/images/Ellipse 2.png" alt=""></img>
                        </div>
                        <div className='group-name'>
                            <h3>{element.groupName}</h3>
                            <h4>{element.groupTagline}</h4>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default ChatGroup
