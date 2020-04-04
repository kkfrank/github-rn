import request from '../utils/request'

export function getUser(token){
    const header = {
        'Authorization': 'Bearer ' + token,
    }
    return request.get('/user', header)
}


export function getUserByName(name){
    return request.get(`/users/${name}`)
}

export function getFollowing(username, params = {}){
    const page = params.page || 1
    return request.get(`/users/${username}/following?page=${page}`, )
}

export function getFollers(username, params = {}){
    const page = params.page || 1
    return request.get(`/users/${username}/followers?page=${page}`, )
}

export function getReceivedEvents(username, params = {}, token){
    const page = params.page || 1
    return request.get(`/users/${username}/received_events?page=${page}`)
}