import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Grid, Alert, AlertTitle } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuBar from "../MenuBar";
import Search from "../HomeContent/Search";
import FriendList from "../HomeContent/FriendList";
import Chat from '../MessageContent/Chat';
import ChatGroup from '../MessageContent/ChatGroup';

const Message = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    let [user, setUser] = useState();
    let [userName, setUserName] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                // console.log(user);
                const { emailVerified, email, displayName } = user
                setUser(user)
                setUserName(displayName)
                // setVarifiedEmail(emailVerified)
                // setUser(email)
                // console.log(varifiedEmail);
                // ...
            } else if (!user) {
                navigate('/')
                // User is signed out
                // ...
            }
        });
    })
    // console.log("user", auth.currentUser.uid);
    return (
        <>
            {
                user &&
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <MenuBar active="message" userName={userName} />
                    </Grid>
                    <Grid item xs={4}>
                        <Search />
                        <ChatGroup />
                        <FriendList term="msg" />
                    </Grid>
                    <Grid item xs={6}>
                        <Chat />
                    </Grid>
                </Grid>


            }
        </>
    )
}

export default Message