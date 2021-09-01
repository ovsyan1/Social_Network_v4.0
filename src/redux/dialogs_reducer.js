const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
let count = 6;

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych', img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png'},
        { id: 2, name: 'Andrew', img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png'},
        { id: 3, name: 'Sveta', img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png'},
        { id: 4, name: 'Sasha', img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png'},
        { id: 5, name: 'Sasha', img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png'},
        { id: 6, name: 'Valera', img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png'}
        ],
       messages: [
        { id: 1, message: 'Hi'},
        { id: 2, message: 'How are you?'},
        { id: 3, message: 'yo'},
        { id: 4, message: 'yo'},
        { id: 5, message: 'yo'},
        { id: 6, message: 'yo'}
        ],
        newMessageText: 'best-network'
}

const dialogsReducer = (state = initialState, action) => {
        switch(action.type){
            case SEND_MESSAGE:
                return {
                    ...state,
                    newMessageText: '',
                    messages:[
                        ...state.messages,
                        {id: ++count, message: state.newMessageText}
                    ]
                }               
            case UPDATE_NEW_MESSAGE_TEXT:
                return {
                    ...state,
                    newMessageText: action.newText
                }
            default:
                return state;
        }
}


export const addMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE,
        status: 'message'
    }
}

export const updateNewMessageTextActionCreator = (text) => {
    return{
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text,
        status: 'message'
    }
}

export default dialogsReducer;