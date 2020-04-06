import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

export default class Loading extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <ActivityIndicator color='#000' size='large'/>
    }
}
