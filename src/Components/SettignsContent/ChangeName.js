import './settigns.css'
import React, { useState } from 'react'
import SettignsModal from '../SettignsModal'
import { getAuth, updateProfile } from "firebase/auth";

const ChangeName = (props) => {
    const [name, setName] = useState('');
    const [renamed, setRenamed] = useState(false);
    const auth = getAuth();

    const updateName = () => {
        name !== '' &&
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                // Profile updated!
                setName('');
                setRenamed(true)
            })
                .catch((err) => {
                    // console.log(err);
                })
    }

    return (
        <div>
            <SettignsModal props={props} >
                <div className='update-form'>
                    <h3>Set New Name</h3>
                    <input type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {
                        !renamed ?
                            <div className='update-btn' onClick={updateName}>Submit</div>
                            :
                            <div className='update-btn'>Name Changed</div>
                    }
                </div>
            </SettignsModal>
        </div>
    )
}

export default ChangeName