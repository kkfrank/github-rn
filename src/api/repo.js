import request from '../utils/request'

export function getRepoList(username, token){
    if(token){
        const header = {
            'Authorization': 'Bearer ' + token,
        }
    }
    return request.get(`/users/${username}/repos`, header)
}

export function getRepo(username, reponame){
    return request.get(`/repos/${username}/${reponame}`)
}


export function getReadme(username, reponame){
    return request.get(`/repos/${username}/${reponame}/readme`)
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