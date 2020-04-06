import request from '../utils/request'

export function searchRepos(params){
    const q = params.q
    const page = params.page || 1
    return request.get(`/search/repositories?q=${q}&page=${page}`)
}



export function searchUsers(params){
    const q = params.q
    const page = params.page || 1
    return request.get(`/search/repositories?q=${q}&page=${page}`)
}
