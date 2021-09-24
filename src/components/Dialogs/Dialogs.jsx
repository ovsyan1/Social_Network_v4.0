import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

// type OwnPropsType = {
//     dialogsPage: InitialStateType
//     sendMessage: (messageText: string) => void
//     updateNewMessageChange: (text: string) => void
//     onClick: () => string
// }
// export type NewMessageFormType = {
//     newMessageBody: string
// }

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialog => {
       return <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} img={dialog.img}/>
    })

    let messagesElements = state.messages.map(message => {
        return <Message message={message.message} key={message.id}/>
    })
    
    const addTxt = (values) => {
        props.sendMessage(values.newMessageBody); 
    }
    const onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageChange(text);
    }

    return(
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
               {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                        <textarea onChange={onMessageChange}   value={state.newMessageText} cols="10" rows="2"></textarea>     
                </div>
                <button onClick={addTxt}>add</button>
            </div>
        </div>
    )
}

export default Dialogs;