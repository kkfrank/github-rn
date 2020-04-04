import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TrendingRepo from './trendingRepo'
import TrendingUser from './trendingUser'

const TopTab = createMaterialTopTabNavigator();

export default class Trending extends Component{
    render(){
        return(
            <TopTab.Navigator initialRouteName="TrendingRepo" lazy={true}>
                <TopTab.Screen name="TrendingRepo" component={TrendingRepo} options={{tabBarLabel: 'Repositories'}}/>
                <TopTab.Screen name="TrendingUser" component = {TrendingUser} options={{title: 'Developers'}}/>
            </TopTab.Navigator>
        )
    }
}