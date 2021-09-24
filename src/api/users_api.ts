import { instance, GetItemsType, APIResponseType } from './api'
import {AxiosPromise} from 'axios';



export const usersAPI = {
    requestUsers(currentPage = 1, pageSize = 10){
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
    },
    follow(userId: number){
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number){
        return  instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
}