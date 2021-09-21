import { InferActionsTypes } from './redux-store';
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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
        switch(action.type){
            case 'SEND-MESSAGE':
                return {
                    ...state,
                    newMessageText: '',
                    messages:[
                        ...state.messages,
                        {id: ++count, message: state.newMessageText}
                    ]
                }               
            case 'UPDATE-NEW-MESSAGE-TEXT':
                return {
                    ...state,
                    newMessageText: action.newText
                }
            default:
                return state;
        }
}

export const actions = {
    sendMessage: () => ({type: 'SEND-MESSAGE', status: 'message'} as const),
    updateNewMessageTextActionCreator: (text: string) => ({
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        newText: text,
        status: 'message'
    } as const )
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>