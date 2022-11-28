import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Grid, Alert, AlertTitle } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuBar from "../MenuBar";
import Search from "../HomeContent/Search";
import GroupList from "../HomeContent/GroupList";
import FriendReq from "../HomeContent/FriendReq";
import FriendList from "../HomeContent/FriendList";
import UserList from "../HomeContent/UserList";
import MyGroups from "../HomeContent/MyGroups";
import BlockedUser from "../HomeContent/BlockedUser";



const Home = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    let [userName, setUserName] = useState()
    let [varifiedEmail, setVarifiedEmail] = useState(false)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                console.log(user);
                const { emailVerified, displayName } = user
                setUserName(displayName)
                setVarifiedEmail(emailVerified)
                // setUser(email)
                console.log(varifiedEmail);
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
                varifiedEmail ?
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <MenuBar active="home" userName={userName} />
                        </Grid>
                        <Grid item xs={4}>
                            <Search />
                            <GroupList />
                            <FriendReq />
                        </Grid>
                        <Grid item xs={3}>
                            <FriendList term="home" />
                            <MyGroups />
                        </Grid>
                        <Grid item xs={3}>
                            <UserList />
                            <BlockedUser />
                        </Grid>
                    </Grid>
                    :
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={6}>
                                <Alert severity="info">
                                    <AlertTitle>We have sent you a varification email. Please Varify your email!</AlertTitle>
                                </Alert>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                        </Grid>
                    </div>

            }
        </>
    )
}

export default Home