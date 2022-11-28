import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue } from "firebase/database";

const useAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const db = getDatabase();
    const activeGroup = useSelector((state) => state.activeChat.value);

    useEffect(() => {
        onValue(ref(db, 'users/'), (snapshot) => {
            let arr = [];
            snapshot.forEach(element => {
                if (element.key === activeGroup.adminId) {
                    arr.push(element.val())
                }
            });
            setAdmins(arr)
        });
    }, [activeGroup])
    return { admins }
}

export default useAdmins;