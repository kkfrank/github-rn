
export class Request{
    constructor(basicUrl){
        this.basicUrl = basicUrl
    }
    get(url, header ={}){
        return new Promise((resolve, reject)=>{
           return fetch(this.basicUrl + url, {
               method: 'GET',
               headers: {
                  // 'Authorization': 'Bearer' + token,
                  //  'Content-type': 'application/json',
                   ...header
               }
           })
           .then(res=> {
               if(res.status >= 200 && res.status<300){
                   return resolve(res.json())
               }
               if(res.status === 401){
                   reject({
                       message: 'Unauthorized'
                   })
               }else if(res.status === 403){
                   // console.log('get', res)
                   reject({
                       message: 'Forbidden'
                   })
               }else{
                   // console.log('get', res)
                   reject({
                       message: 'call api error'
                   })
               }
           })
           .catch(err=>reject(err))
        })
    }
    post(url, data, header = {}){
        return new Promise((resolve, reject)=>{
            return fetch(this.basicUrl + url, {
                method: 'POST',
                headers: {
                   // 'Authorization': 'Bearer' + token,
                    //'Content-type': 'application/json',
                    ...header
                },
                body: data
            })
            .then(res=> resolve(res.json()))
            .catch(err=>reject(err))
        })
    }
}



const apiBase = 'https://api.github.com'
export default new Request(apiBase)

