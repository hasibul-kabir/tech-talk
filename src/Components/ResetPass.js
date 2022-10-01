import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const sendResetPassEmail = () => {
        if (email != "") {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    navigate('/', {
                        state: {
                            message: "Check your email to reset password."
                        }
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }

    return (
        <div className='reset-pass'>
            <h2>Forgot Password?</h2>
            <div className='reset-form'>
                <h4>Enter you email to reset password</h4>
                <input type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                <div className='btn'><button onClick={sendResetPassEmail}>Submit</button></div>
            </div>
        </div>
    )
}
export default ResetPass;
