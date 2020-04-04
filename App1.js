import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer  } from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text ,ScrollView, StyleSheet } from 'react-native'
import Trending from './src/pages/trending'
import Activity from './src/pages/activity/activity'
import Profile from './src/pages/profile/profile'
import Login from './src/pages/login/login'
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from  "./src/utils/storage";
import TrendingUserDetail from './src/pages/userDetail/userDetail'
import Followers from "./src/pages/follower/index";
import Following from "./src/pages/following/index";
import RepoDetail from "./src/pages/repo/repo";

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthContext = React.createContext('auth')

function getHeaderTitle(route) {
    // Access the tab navigator's state using `route.state`
    const routeName = route.state
        ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
        : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
          // In our case, it's "Feed" as that's the first screen inside the navigator
        route.params?.screen || 'Trending';

    switch (routeName) {
        case 'Activity':
            return 'Activity';
        case 'Trending':
            return 'Trending';
        case 'Profile':
            return 'Profile';
    }
}


function HomeTabs({navigation, route}){
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }, [navigation, route]);

    return (
        <Tab.Navigator lazy={true}>
            <Tab.Screen name="Activity" component={ Activity } options={{
                tabBarIcon:({color, size})=>(
                    <Icon name='star' color={color} size={size} />
                )}}/>
            <Tab.Screen name="Trending" component={ Trending } options={{
                tabBarIcon:({color, size})=>(
                    <Icon name='line-chart' color={color} size={size} />
                )}}/>
            <Tab.Screen name="Profile" component={ Profile } options={{
                tabBarIcon: ({color, size})=>(
                    <Icon name='user' color={color} size={size} />
                )}} />
        </Tab.Navigator>
    )
}


export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentUser: false
        }
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    }
    componentDidMount(){
        //https://github.com/sunnylqm/react-native-storage
        storage.getItem('user').then(data=>{
            console.log('user', typeof data, data)
            if(data){
                this.setState({
                    currentUser: JSON.parse(data)
                })
            }
        })
    }

    handleLoginSuccess(data){
        this.setState({
            currentUser: data
        })
    }

    render(){
        return (
            // initialRouteName
            <NavigationContainer>
                {
                    this.state.currentUser ? (
                        <Stack.Navigator initialRouteName="home" >
                            <Stack.Screen name='home' component={HomeTabs} />
                            <Stack.Screen name="trendingRepoDetail" component={ RepoDetail } options = {{title: ''}} />
                            <Stack.Screen name="trendingUserDetail" component={ TrendingUserDetail } options = {{title: ''}} />
                            <Stack.Screen name="followers" component={ Followers } options = {{title: 'Followers'}}  />
                            <Stack.Screen name="following" component={ Following } options = {{title: 'Following'}} />
                        </Stack.Navigator>
                    ):(
                        <Login navigation={this.props.navigation} loginSuccess={this.handleLoginSuccess}/>
                    )
                }
            </NavigationContainer>
        );
    }
}

