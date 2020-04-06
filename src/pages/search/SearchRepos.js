import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { getFollowing } from '../../api/user'
import { searchRepos, searchUsers } from '../../api/search'

export default class SearchRepos extends Component{
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
        const { search } = this.props.route.params
        console.log('fkkk',search)
        if(search){
            this.loadMore()
        }
    }

    loadMore(){
        const { search } = this.props.route.params
        const { page, loading, list } = this.state
        if(loading) return

        this.setState({ loading: true})

        searchRepos({q: search, page: page+1}).then(data=>{
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
                      onEndReached={this.loadMore}
                      ListFooterComponent={this.renderFooter}
                      renderItem={({item})=>(
                          <TouchableOpacity key={item.id}
                                            onPress={()=>{this.props.navigation.push('trendingUserDetail', {username: item.login})}}>
                              <View style={styles.userItem}>
                                  <Image source={{uri: item.avatar_url}} style={styles.avatar}/>
                                  <Text>{ item.login }</Text>
                              </View>
                          </TouchableOpacity>
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