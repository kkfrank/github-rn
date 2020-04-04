import React, { Component } from 'react'
import { Alert, FlatList, Modal, StatusBar, ScrollView,
    StyleSheet, ActivityIndicator,
    Text, View,TouchableOpacity } from 'react-native'

import { getReceivedEvents } from '../../api/user'
import ActivityItem from './activityItem'

export default class Activity extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            list: [],
            page: 0
        }
        this.loadMore = this.loadMore.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }
    componentDidMount(){

        console.log('Activity componentDidMount',this.props)
        this.loadMore()
    }
    loadMore(){
        let { page, loading, list } = this.state
        if(loading) return

        this.setState({
            loading: true
        })
        page = page + 1
        getReceivedEvents('kkfrank', {page})
            .then(data => {
                this.setState({
                    loading: false,
                    // list: this.state.list.concat(data),
                    list: [...list, ...data],
                    page
                })
            })
    }
    renderFooter(){
        if(!this.state.loading) return null;
        return (<ActivityIndicator color='#000' size="large"/>)
    }
    render(){
        const { loading, list, page } = this.state
        if(loading && page === 0){
            return (<ActivityIndicator color='#000' size="large"/>)
        }
        console.log('activity', list)
        return(
            <FlatList style={styles.userDetail}
                      data={list}
                      onEndReached={this.loadMore}
                      ListFooterComponent={this.renderFooter}
                      renderItem={({item})=>(
                          <ActivityItem item={item} key={item.id} navigation={this.props.navigation}/>
                      )}/>
        )
    }
}

const styles = StyleSheet.create({

})