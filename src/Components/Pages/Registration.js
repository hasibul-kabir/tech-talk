import React, { useState } from 'react'
import { Grid, TextField } from '@mui/material'
import { Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";//realtime database



import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



const Registration = () => {
    const db = getDatabase();
    const auth = getAuth();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    let [email, setEmail] = useState('')
    let [name, setName] = useState('')
    let [pass, setPass] = useState('')
    let [confirmPass, setConfirmPass] = useState('');

    let [emailErr, setEmailErr] = useState('')
    let [nameErr, setNameErr] = useState('')
    let [passErr, setPassErr] = useState('')
    let [confirmPassErr, setConfirmPassErr] = useState('')

    // manage serverside errors
    const [existingMailErr, setExistingMailErr] = useState()




    let handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setEmailErr('Please enter your email!')
        } else if (!name) {
            setNameErr('Please enter your name!')
            setEmailErr('')

        } else if (!pass) {
            setPassErr('Please enter a password!')
            setNameErr('')

        } else if (!confirmPass) {
            setConfirmPassErr('Please confirm your password!')
            setPassErr('')
        } else if (pass.length < 8) {
            setPassErr('Password should be equal or more than eight character')
        } else if (pass !== confirmPass) {
            setConfirmPassErr('Password does not match!')
            setPassErr('')
        } else {
            setPassErr('')
            setConfirmPassErr('')

            createUserWithEmailAndPassword(auth, email, pass)
                .then((user) => {
                    console.log(user);
                    navigate('/')
                    setEmail('')
                    setName('')
                    setPass('')
                    setConfirmPass('')


                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!
                            // ...
                            console.log("email sent");
                        });

                    updateProfile(auth.currentUser, {
                        displayName: name
                    }).then(() => {
                        console.log("Profile updated!");
                        console.log('current User', auth.currentUser);
                        // Profile updated!
                        // ...

                        set(ref(db, 'users/' + auth.currentUser.uid), {
                            username: name,
                            email: email
                        });


                    }).catch((error) => {
                        console.log(error.code);
                        // An error occurred
                        // ...
                    });
                })
                .catch((error) => {
                    const { code, message } = error

                    const mailErr = code.includes('email')
                    if (mailErr) {
                        setExistingMailErr("Email already exists! Try with another.")
                    }
                    console.log(mailErr);
                    setEmail('')
                    setName('')
                    setPass('')
                    setConfirmPass('')
                })
        }

    }


    return (
        <>
            <section className='registration'>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <div className='left'>
                            <div className='registration-form'>
                                <h2>Get started with easily register</h2>
                                <p className='title'>Free register and you can enjoy it</p>

                                {
                                    existingMailErr ?
                                        <Collapse in={open}>
                                            <Alert
                                                severity="error"
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2 }}
                                            >
                                                {existingMailErr}
                                            </Alert>
                                        </Collapse>
                                        : ""
                                }
                                <form>
                                    <TextField
                                        helperText={emailErr}
                                        id="demo-helper-text-misaligned"
                                        label="Email Address"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                    <br />
                                    <TextField
                                        helperText={nameErr}
                                        id="demo-helper-text-misaligned"
                                        label="Full Name"
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}

                                    />
                                    <br />
                                    <TextField
                                        helperText={passErr}
                                        id="demo-helper-text-misaligned"
                                        label="Password"
                                        type="password"
                                        onChange={(e) => setPass(e.target.value)}
                                        value={pass}
                                    />
                                    <br />
                                    <TextField
                                        helperText={confirmPassErr}
                                        id="demo-helper-text-misaligned"
                                        label="Confirm Password"
                                        type="password"
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        value={confirmPass}
                                    />
                                    <br />
                                    <button className='signup-btn' onClick={handleSubmit}>Sign up</button>
                                </form>
                                <p className='redirectlink'>Already registered ? <Link to="/">Login</Link> </p>

                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div>
                            <img style={{ width: '100%', height: '100vh' }} src='./assets/images/registrationImg.png' />
                        </div>
                    </Grid>
                </Grid>
            </section>
        </>
    )
}

export default Registration