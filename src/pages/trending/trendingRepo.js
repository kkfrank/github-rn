import React, { Component } from 'react'
import { Alert, FlatList, Modal,
    ActivityIndicator, StatusBar, ScrollView, Text, View, Image,TouchableOpacity, StyleSheet } from 'react-native'

import TrendingRepoItem from './trendingRepoItem'
// import styles from './style/TrendingList'
import { getTrendingRepos } from '../../api/treding'

export default class TrendingList extends Component{
    static navigationOptions = {
        title: 'sdfs',
    };

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            list: []
        }
        // this.props.navigation.setOptions({ title: 'Updated!' })
    }
    componentDidMount(){
        getTrendingRepos('javascript').then(res=>{
            console.log('fkk reop', res)
            this.setState({
                loading: false,
                list: res
            })
        }).catch(err=>{
            Alert.alert(
                'Alert Title', err,
                [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        })
    }
    render(){
        if(this.state.loading){
            return(
                <ActivityIndicator size="large" color="#000"/>
            )
        }
        return(
            <View>
                {/*<StatusBar backgroundColor="blue" barStyle="light-content" />*/}
                <ScrollView style={styles.trendList}>
                    {
                        this.state.list.map(item => (
                            <TouchableOpacity  key={item.name}  onPress={()=>{
                                this.props.navigation.navigate('trendingRepoDetail',{username: item.author, reponame: item.name}
                            )}}>
                                <TrendingRepoItem item = {item}navigation={this.props.navigation}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    trendList: {
        // backgroundColor: 'red',
        // padding: 10
    }
})
