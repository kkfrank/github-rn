import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ActivityIndicator, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { searchRepos, searchUsers } from '../../api/search'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchRepos from './SearchRepos'
import SearchUsers from './SearchUsers'

const TopTab = createMaterialTopTabNavigator();

export default class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            search: '',
            historySearch: [],
            currentTab: 'repo'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount(){

    }

    handleChange(text){
        this.setState({
            search: text
        })
    }

    async handleSearch(){
        const { search, currentTab } = this.state
        if(search){
            //const repos = await searchRepos({q: search})
            //const users = await searchUsers({q: search})
            // if(currentTab === 'repo'){
            //     const repos = await searchRepos({q: search})
            //     console.log(repos)
            // }else{
            //     const users = await searchUsers({q: search})
            //     console.log(users)
            // }
        }
    }

    render(){
        const { search } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <Icon name='search' color={'#000'} size={18} style={styles.searchIcon}/>
                    <TextInput style={styles.searchInput}
                               underlineColorAndroid = "transparent"
                               placeholder = "Repo or user"
                               onSubmitEditing={this.handleSearch}
                               onChangeText={this.handleChange}/>
                </View>
                {
                    false && (
                        <View>
                            <Text>搜索历史</Text>
                            <Text>清空搜索历史</Text>
                        </View>
                    )
                }
                <View style={styles.searchResult}>
                    <TopTab.Navigator lazy={true}>
                        <TopTab.Screen name="SearchRepos" component={SearchRepos} options={{tabBarLabel: 'Repos'}} initialParams={{search: search}}/>
                        <TopTab.Screen name="SearchUsers" component = {SearchUsers} options={{title: 'Users'}} initialParams={{search: search}}/>
                    </TopTab.Navigator>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchBox: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#dfe2e5',
        borderRadius: 6,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#dfe2e5',
        borderBottomWidth: 1
    },
    searchIcon:{
       flexShrink: 0,
       marginRight:10
    },
    searchInput: {
        flexGrow: 1,
        color: '#000'
        // borderColor: 'gray',
        // borderWidth: 1
    },
    searchResult:{
        flexGrow: 1,
    }
})