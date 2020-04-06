import React, { Component } from 'react'
import { Text, View, Image, Button, TextInput, StyleSheet, Switch, AsyncStorage } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();
import { AuthContext } from "../../authContext";

import Toast from '../components/Toast'
import { getUser } from "../../api/user";

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            type: 'normal',
            email: '',
            password: '',
            rememberMe: false,
            token:'',
            msg: ''
        }
    }

    handleChangeFiled(props, value){
        this.setState({
            [props]: value,
        })
    }

    async handleLogin(setCurrentUser){
        const token = this.state.token

        if(!token){
            this.setState({ msg: 'token为空' })
            return
        }

        try{
           const user =  await getUser(token)
           const userString = JSON.stringify(user)

           if(this.state.rememberMe){
               await AsyncStorage.setItem('user', userString)
           }
           setCurrentUser(user)
        }catch(err){
            this.setState({
                msg: err.message
            })
        }
    }

    render(){
        return(
            <AuthContext.Consumer>
                {
                    ({currentUser, setCurrentUser})=>(
                        <View style={styles.loginBox}>
                            <Toast msg = {this.state.msg}/>
                            <Image source={require('../../assets/image/github-logo.png')}/>
                            <Text>Login page</Text>
                            <View style={styles.tab}>
                                <Text style={[styles.tabItem, this.state.type === 'normal' && styles.active]} onPress={()=>{this.handleChangeFiled('type', 'normal')}}>账号密码</Text>
                                <Text style={[styles.tabItem, this.state.type !== 'normal' && styles.active]} onPress={()=>{this.handleChangeFiled('type', 'token')}}>Token</Text>
                            </View>
                            {
                                this.state.type === 'normal' && (
                                    <View style={styles.loginContent}>

                                        <TextInput placeholder='Please input email' style={styles.username}
                                                   onChangeText={(text)=>{this.handleChangeFiled('email', text)}} />
                                        <TextInput  placeholder="Please input password" style={styles.password} secureTextEntry={true}
                                                    onChangeText={(text)=>{this.handleChangeFiled('password', text)}} />
                                    </View>
                                )
                            }
                            {
                                this.state.type === 'token' && (
                                    <View style={styles.loginContent}>
                                        <TextInput placeholder='Please input token' style={styles.token}
                                                   onChangeText={(text)=>{this.handleChangeFiled('token', text)}} />
                                    </View>
                                )
                            }
                            <View style={styles.submitBox}>
                                <View style={styles.rememberMe}>
                                    <CheckBox value={this.state.rememberMe} onChange={()=>{this.handleChangeFiled('rememberMe', !this.state.rememberMe)}}/>
                                    <Text onPress={()=>{this.handleChangeFiled('rememberMe', !this.state.rememberMe)}}>Remember Me</Text>
                                </View>
                                <Button title='submit' style={styles.login} onPress={()=>{this.handleLogin(setCurrentUser)}}/>
                            </View>
                        </View>
                    )
                }
            </AuthContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    loginBox:{
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        paddingTop: 40,
        borderRadius: 10,
        margin:20,
        alignSelf: 'stretch',
    },
    loginContent:{
        flexGrow: 1,
        alignSelf: 'stretch',
    },
    username: {
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    password: {
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    token: {
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    login: {

    },
    tab: {
        height: 40,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        paddingBottom: 4
    },
    active: {
        borderBottomColor: '#000000',
        borderBottomWidth: 3,
    },
    submitBox:{
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    rememberMe: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    }
})