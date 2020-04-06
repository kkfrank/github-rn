import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Toast extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { msg } = this.props
        return(
            <View style = {[styles.toast, !msg? styles.none: '']}>
                <Text>{ msg }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toast:{
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor:'red'
    },
    none: {
        display: 'none'
    }
})