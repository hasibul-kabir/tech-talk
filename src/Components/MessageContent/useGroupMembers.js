import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue } from "firebase/database";

const useGroupMembers = () => {
    const [members, setMembers] = useState([]);
    const db = getDatabase();
    const activeGroup = useSelector((state) => state.activeChat.value);

    useEffect(() => {
        onValue(ref(db, 'groupMember/'), (snapshot) => {
            let arr = [];
            snapshot.forEach(element => {
                if (element.val().groupId === activeGroup.groupId) {
                    arr.push(element.val())
                }
            });
            setMembers(arr)
        });
    }, [activeGroup])

    return { members, activeGroup };

}

export default useGroupMembers;