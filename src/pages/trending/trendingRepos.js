import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native'
import TrendingRepoItem from './trendingRepoItem'
import { getTrendingRepos } from '../../api/treding'

export default class trendingRepos extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            list: []
        }
    }

    componentDidMount(){
        getTrendingRepos('javascript').then(res => {
            this.setState({
                loading: false,
                list: res
            })
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
                                <TrendingRepoItem item = {item} navigation={this.props.navigation}/>
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
