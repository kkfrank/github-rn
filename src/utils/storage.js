import { AsyncStorage } from 'react-native'

export async function setItem(key, value){
    try{
        await AsyncStorage.setItem(key,value)
    }catch (error){
        console.log(error)
    }
}

export async function getItem(key){
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    }catch (error){
        console.log(error)
    }
}


export async function removeItem(key){
    try {
        const value = await AsyncStorage.remove(key)
    }catch (error){
        console.log(error)
    }
}

export default {
    setItem,
    getItem,
    removeItem
}
