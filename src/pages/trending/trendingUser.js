import React, { Component } from 'react'
import { Alert, FlatList, Modal, StatusBar, ActivityIndicator,StyleSheet, ScrollView, Text, View, Image,TouchableOpacity } from 'react-native'
import { getTrendingUsers } from '../../api/treding'
import TrendingUserItem from './trendingUserItem'

export default class TrendingUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            list: []
        }
    }
    componentDidMount(){
        getTrendingUsers('javascript').then(res=>{
            this.setState({
                loading: false,
                list: res
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        const {loading, list} = this.state
        if(loading){
            return <ActivityIndicator color='#000' size='large'/>
        }
        return(
            <View style={styles.userList}>
                <ScrollView>
                    {
                        list.map(item=>(
                            <TouchableOpacity key={item.username}
                                onPress={()=>{this.props.navigation.navigate('trendingUserDetail', {username:item.username})}}>
                                <TrendingUserItem item={item} key={item.username}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userList: {

    }
})