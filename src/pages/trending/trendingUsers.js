import React, { Component } from 'react'
import { ActivityIndicator,StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
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
        const { loading, list } = this.state
        if(loading){
            return <ActivityIndicator color='#000' size='large'/>
        }
        return(
            <View style={styles.userList}>
                <ScrollView>
                    {
                        list.map(user=>(
                            <TouchableOpacity key={user.username}
                                onPress={()=>{this.props.navigation.navigate('trendingUserDetail', {username: user.username})}}>
                                <TrendingUserItem user={user} />
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