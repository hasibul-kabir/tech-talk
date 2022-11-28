import React, { useState } from 'react'
import SettignsModal from '../SettignsModal'
import { getAuth, updatePassword } from "firebase/auth";

const ChangePass = (props) => {
    const [pass, setPass] = useState('');
    const [changed, setChanged] = useState(false);
    const auth = getAuth();

    const user = auth.currentUser;

    const resetPass = () => {
        pass !== '' &&
            updatePassword(user, () => { return pass }).then(() => {
                // Update successful.
                setPass('')
                setChanged(true)
            }).catch((error) => {
                // An error ocurred
                // ...
            });
    }

    return (
        <div>
            <SettignsModal props={props} >
                <div className='update-form'>
                    <h3>Set New Password</h3>
                    <input type='password'
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                    />
                    {
                        !changed ?
                            <div className='update-btn' onClick={resetPass}>Submit</div>
                            :
                            <div className='update-btn'>Password Changed!</div>
                    }
                </div>
            </SettignsModal>
        </div>
    )
}

export default ChangePass