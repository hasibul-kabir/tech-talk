import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Grid } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuBar from "../MenuBar";
import ProfileSettigns from '../SettignsContent/ProfileSettigns';
const Settings = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    let [user, setUser] = useState();
    let [userName, setUserName] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                // console.log(user);
                const { displayName } = user
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
    }, [])
    return (
        <>
            {
                user &&
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <MenuBar active="settigns" userName={userName} />
                    </Grid>
                    <Grid item xs={5}>
                        <ProfileSettigns />
                    </Grid>
                    <Grid item xs={5}>

                    </Grid>
                </Grid>


            }
        </>
    )
}

export default Settings