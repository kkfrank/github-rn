import { Request } from '../utils/request'

const apiTrendingBase = 'https://github-trending-api.now.sh'
const trendingRequest = new Request(apiTrendingBase)

export function getTrendingRepos(language, date){
    let params = {}
    if(language){
        params.language = language
    }
    if(date){
        params.since = date
    }
    let queryString = Object.keys(params).map(key=>key+'='+params[key]).join('&')

    return trendingRequest.get(`/repositories?${queryString}`)

}

export function getTrendingUsers(language, date){
    let params = {}
    if(language){
        params.language = language
    }
    if(date){
        params.since = date
    }
    let queryString = Object.keys(params).map(key=>key+'='+params[key]).join('&')

    return trendingRequest.get(`/developers?${queryString}`)
}