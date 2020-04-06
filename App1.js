import React from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './src/pages/components/Loading'
import Trending from './src/pages/trending/trending'
import Activity from './src/pages/activity/activity'
import Login from './src/pages/login/login'
import Icon from 'react-native-vector-icons/FontAwesome';
import TrendingUserDetail from './src/pages/trending/trendingUserDetail'
import Followers from "./src/pages/follower/follower";
import Following from "./src/pages/following/following";
import RepoDetail from "./src/pages/repo/repo";
import Me from "./src/pages/me/me";
import Search from "./src/pages/search/search";
import { AuthContext } from './src/authContext'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getRouteName(route) {
    // Access the tab navigator's state using `route.state`
    return route.state
        ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
        : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
          // In our case, it's "Feed" as that's the first screen inside the navigator
        route.params?.screen || 'Activity';
}

function getHeaderTitle(route) {
    const routeName = getRouteName(route)
    switch (routeName) {
        case 'Activity':
            return 'Activity';
        case 'Trending':
            return 'Trending';
        case 'Me':
            return 'Me';
    }
}

function getHeaderRight(route, navigation){
    const routeName = getRouteName(route)
    if(routeName === 'Activity' || routeName === 'Trending'){
        return ()=>HeaderSearch(navigation)
    }
}

// headerRight: HeaderSearch, headerRightContainerStyle: styles.headerRight
function HeaderSearch(navigation){
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('search')}}>
            <Icon name='search' color={'#000'} size={18} />
        </TouchableOpacity>
    )
}

function HomeTabs({navigation, route}){
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: getHeaderTitle(route),
            headerRight: getHeaderRight(route ,navigation),
            headerRightContainerStyle: styles.headerRight
        });
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
            <Tab.Screen name="Me" component={ Me } options={{
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
            loading: true,
            currentUser: false
        }
        this.setCurrentUser = this.setCurrentUser.bind(this)
    }

    componentDidMount(){
        this._bootstrapAsync()
    }

     async _bootstrapAsync (){
        const userString = await AsyncStorage.getItem('user')
        this.setState({
             loading: false,
             currentUser: JSON.parse(userString)
        })
     }

    setCurrentUser(user){
        this.setState({ currentUser: user })
    }

    setLoading(loading){
        this.setState({ loading })
    }

    render(){
        const { loading, currentUser } = this.state
        if(loading){ <Loading /> }

        return (
            <AuthContext.Provider value={{
                currentUser,
                setLoading: this.setLoading,
                setCurrentUser: this.setCurrentUser
            }}>
                {/* initialRouteName*/}
                <NavigationContainer>
                    <Stack.Navigator>
                        {
                            currentUser ? (
                                <>
                                    <Stack.Screen name='home' component={HomeTabs} />
                                    <Stack.Screen name="trendingRepoDetail" component={ RepoDetail } options = {{title: ''}} />
                                    <Stack.Screen name="trendingUserDetail" component={ TrendingUserDetail } options = {{title: ''}} />
                                    <Stack.Screen name="followers" component={ Followers } options = {{title: 'Followers'}}  />
                                    <Stack.Screen name="following" component={ Following } options = {{title: 'Following'}} />
                                    <Stack.Screen name="search" component={ Search } options = {{title: 'Search'}} />
                                </>
                            ): (
                                <Stack.Screen name='login' component={ Login } options={{  headerTitle: 'Login' }} initialParams={{ p1: 'not-used' }}/>
                                // <Login navigation={this.props.navigation} loginSuccess={this.handleLoginSuccess}/>
                            )
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        );
    }
}

const styles = StyleSheet.create({
    headerRight: {
        alignItems: 'center',
        paddingRight: 20
    }
})