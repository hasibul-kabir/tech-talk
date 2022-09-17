import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';



let receive = {
    background: '#f1f1f1',
    color: '#464545;'
}
let send = {
    background: '#3d4aff',
    color: '#fff'
}
let alignLeft = {
    justifyContent: 'flex-start'
}
let alignRight = {
    justifyContent: 'flex-end'

}


const Chat = () => {
    return (
        <div className='chat'>
            <div className='top-part'>
                <div className='identity'>
                    <div className='identity-img'>
                        <img src='./assets/images/profile_image.jpg' />
                        <div className='status'></div>
                    </div>
                    <div className='identity-txt'>
                        <h3>My Name</h3>
                        <p>Online</p>
                    </div>
                </div>
                <div className='sign'><MoreVertIcon /></div>
            </div>
            <div className='conversations'>
                <div className='message' style={alignLeft}>
                    <p style={receive}>Hello! How are you? Hello! How are you?</p>
                </div>
                <div className='message' style={alignRight}>
                    <p style={send} >Hi!</p>
                </div>
                <div className='message' style={alignLeft}>
                    <p style={receive}>Hello! How are you? Hello! How are you?</p>
                </div>
                <div className='message' style={alignRight}>
                    <p style={send} >Hi!</p>
                </div>
                <div className='message' style={alignLeft}>
                    <p style={receive}>Hello! How are you? Hello! How are you?</p>
                </div>
                <div className='message' style={alignRight}>
                    <p style={send} >Hi!</p>
                </div>
                <div className='message' style={alignRight}>
                    <p style={send} >Hi!</p>
                </div>
                <div className='message' style={alignRight}>
                    <p style={send} >Hi! Having Fun</p>
                </div>
            </div>
            <div className='bottom'>Bottom</div>
        </div>
    )
}

export default Chat