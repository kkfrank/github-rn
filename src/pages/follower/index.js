import React, { Component } from 'react'
import { Text, View, Image, Button, StyleSheet ,ScrollView, ActivityIndicator,
FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFollers } from '../../api/user'
import gStyles from '../../commonStyle'

export default class Followers extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            page: 0,
            loading: false,
        }
        this.loadMore = this.loadMore.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }
    componentDidMount(){
        this.loadMore()
    }

    loadMore(){
        const { username } = this.props.route.params
        // const username = 'wizardforcel'
        const { page, loading, list } = this.state
        if(loading) return

        this.setState({ loading: true})

        getFollers(username, {page: page+1}).then(data=>{
            this.setState({
                loading: false,
                page: page + 1,
                list : [...list, ...data],
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    renderFooter(){
        if(!this.state.loading) return null;
        return (<ActivityIndicator color='#000' size="large"/>)
    }

    render(){
        const { loading, page, list } = this.state
        if (loading && page === 0 ) {
            return <ActivityIndicator color='#000' size='large'/>
        }
        return(
            <FlatList style={styles.userDetail}
                      data={list}
                      // colors={["#9Bd35A", "#689F38"]}
                      // refreshing={this.state.loading}
                      onEndReached={this.loadMore}
                      ListFooterComponent={this.renderFooter}
                      renderItem={({item})=>(
                          <View style={ styles.userItem } key={item.id}>
                              <Image source={{uri: item.avatar_url}} style={styles.avatar}/>
                              <Text>{ item.login }</Text>
                          </View>
                      )}/>
        )
    }
}


const styles = StyleSheet.create({
    userItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CED0CE'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20
    },
})