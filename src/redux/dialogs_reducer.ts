const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
let count = 6;

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych'},
        { id: 2, name: 'Andrew'},
        { id: 3, name: 'Sveta'},
        { id: 4, name: 'Sasha'},
        { id: 5, name: 'Sasha'},
        { id: 6, name: 'Valera'}
        ] as Array<DialogType>,
       messages: [
        { id: 1, message: 'Hi'},
        { id: 2, message: 'How are you?'},
        { id: 3, message: 'yo'},
        { id: 4, message: 'yo'},
        { id: 5, message: 'yo'},
        { id: 6, message: 'yo'}
        ] as Array<MessageType>,
        newMessageText: 'best-network'
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type addMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    status: string
}


export const addMessageActionCreator = (): addMessageActionCreatorType => {
    return {
        type: SEND_MESSAGE,
        status: 'message'
    }
}

export const updateNewMessageTextActionCreator = (text: string) => {
    return{
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text,
        status: 'message'
    }
}

export default dialogsReducer;