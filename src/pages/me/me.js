import React, { Component } from 'react'
import { Alert, Button, View, AsyncStorage } from 'react-native'
import { AuthContext } from "../../authContext";
import Profile from '../profile/ProfileCmp'

export default class Me extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.showLogoutAlert = this.showLogoutAlert.bind(this)
    }

    componentDidMount(){

    }

    showLogoutAlert(setCurrentUser){
        Alert.alert("Alert", "Are you sure to log out?",[
            {
                text: 'Cancel'
            },{
                text: 'Confirm',
                onPress(){
                    this.handleLogout(setCurrentUser)
                }
            }
        ])
    }


    async handleLogout(setCurrentUser){
        await AsyncStorage.removeItem('user')
        setCurrentUser(null)
    }

    render(){
        return(
            <AuthContext.Consumer>
                {
                    ({currentUser, setCurrentUser}) => (
                        <View>
                            <Profile detail={ currentUser } navigation = {this.props.navigation}/>
                            <Button onPress={()=>this.showLogoutAlert(setCurrentUser)} title='Log out'/>
                        </View>
                    )
                }
            </AuthContext.Consumer>
        )
    }
}