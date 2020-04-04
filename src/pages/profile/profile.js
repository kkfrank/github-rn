import React, { Component } from 'react'
import { Alert, FlatList, Modal, StatusBar, ScrollView, Text, View, Image,TouchableOpacity } from 'react-native'

import {getTrendingRepos} from '../../api/treding'

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        console.log('Profile componentDidMount',this.props)
    }
    render(){
        return(
            <View>
                <Text>This is Profile page</Text>
            </View>
        )
    }
}