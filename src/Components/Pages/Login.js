import React, { useState } from 'react'
import { Alert, Grid, TextField, IconButton, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [open, setOpen] = React.useState(true);

    const navigate = useNavigate();

    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')

    let [emailErr, setEmailErr] = useState('')
    let [passErr, setPassErr] = useState('')

    let [typePass, setTypePass] = useState(true)

    //Error from server side

    const [wrongIdPass, setWrongIdPass] = useState()



    let handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/home')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    let handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setEmailErr('Please enter your email first!')
        } else if (!pass) {
            setPassErr('Please give your password!')
            setEmailErr('')
        } else {
            setEmailErr('')
            setPassErr('')

            signInWithEmailAndPassword(auth, email, pass)
                .then((user) => {
                    // console.log(auth);
                    // console.log(user);
                    navigate('/home')
                    setEmail('')
                    setPass('')
                })
                .catch((error) => {
                    console.log(error);
                    if (error) {
                        setWrongIdPass('Wrong user email or password!')
                    }
                    setEmail('')
                    setPass('')
                })
        }
    }

    let handlePassVis = () => {
        setTypePass(!typePass)
    }

    return (
        <>
            <section className='login'>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <div className='left'>
                            <div className='login-form'>
                                <h2>Login to your account!</h2>
                                <div className='social-login'>
                                    <div className='googleLogin' onClick={handleGoogleSignin} >
                                        <img src='./assets/images/google.png' />
                                        <p>Login with Google</p>
                                    </div>
                                    <div className='facebookLogin'>
                                        <img src='./assets/images/facebook.png' />
                                        <p>Login with Facebook</p>
                                    </div>
                                </div>
                                <br />
                                {
                                    wrongIdPass ?
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
                                                {wrongIdPass}
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
                                        helperText={passErr}
                                        id="demo-helper-text-misaligned"
                                        label="Password"
                                        type={typePass ? 'password' : 'text'}
                                        onChange={(e) => setPass(e.target.value)}
                                        value={pass}
                                    />

                                    {typePass ? <VisibilityOffIcon className='eye-icon' onClick={handlePassVis} /> : <RemoveRedEyeIcon className='eye-icon' onClick={handlePassVis} />}

                                    <br />
                                    <button className='signin-btn' onClick={handleSubmit} >Sign in</button>
                                </form>
                                <p className='redirectlink'>Don’t have an account ? <Link to="/registration">Sign up</Link> </p>

                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div>
                            <img style={{ width: '100%', height: '100vh' }} src='./assets/images/loginImg.png' />
                        </div>
                    </Grid>
                </Grid>
            </section>
        </>
    )
}

export default Login