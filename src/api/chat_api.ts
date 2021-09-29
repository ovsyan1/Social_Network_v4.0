


const subscribers = [] as SubscriberType[]

let ws: WebSocket

const closeHandler = () => {
    console.log('close ws');
    setTimeout(() => createChannel(), 3000);
}

function createChannel(){
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
}

export const chatAPI = {
    subscribe(callback: SubscriberType){
        subscribers.push(callback)
    }
}

type SubscriberType = (messages: ChatMessageType) => void


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
