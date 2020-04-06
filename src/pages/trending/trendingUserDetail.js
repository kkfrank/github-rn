import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import ProfileCmp from '../profile/ProfileCmp'
import { getUserByName } from '../../api/user'

export default class TrendingUserDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            detail: {},
            loading: true,
        }
    }

    componentDidMount(){
        const { username } = this.props.route.params
        this.props.navigation.setOptions({ title: username })

        getUserByName(username).then(data=>{
            this.setState({
                loading: false,
                detail : data
            })
        }).catch(err=>{
            console.log('err', err)
        })
    }

    render(){
        const { detail, loading } = this.state
        if(loading){
            return(
                <ActivityIndicator size="large" color="#000"/>
            )
        }
        return <ProfileCmp detail={detail} navigation={this.props.navigation}/>
    }
}