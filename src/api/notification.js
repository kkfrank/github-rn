import request from '../utils/request'

export function getNotificationList(token, params = {}){
    const header = {
        'Authorization': 'Bearer ' + token,
    }
    const page = params.page || 1
    return request.get(`/notifications?page=${page}`, header)
}
