import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrendingRepos from './trendingRepos'
import TrendingUsers from './trendingUsers'

const TopTab = createMaterialTopTabNavigator();

export default class Trending extends Component{
    render(){
        return(
            <TopTab.Navigator initialRouteName="TrendingRepo" lazy={true}>
                <TopTab.Screen name="TrendingRepo" component={TrendingRepos} options={{tabBarLabel: 'Repositories'}}/>
                <TopTab.Screen name="TrendingUser" component = {TrendingUsers} options={{title: 'Developers'}}/>
            </TopTab.Navigator>
        )
    }
}