import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import ProfileCmp from '../profile/ProfileCmp'
import { getUserByName } from '../../api/user'

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            detail: {},
            loading: true,
        }
    }

    componentDidMount(){
        const { user } = this.props.route.params
        this.props.navigation.setOptions({ title: user.name })

        getUserByName(user.username).then(data=>{
            this.setState({
                loading: false,
                detail : data
            })
        })
    }

    render(){
        const { detail, loading } = this.state
        if(loading){
            return(
                <ActivityIndicator size="large" color="#000"/>
            )
        }
        return <ProfileCmp detail={detail} />
    }
}