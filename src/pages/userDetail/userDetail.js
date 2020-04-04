import React, { Component } from 'react'
import { Text, View, Image, Button, StyleSheet ,ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserByName } from '../../api/user'
import gStyles from '../../commonStyle'

export default class UserDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            detail: {},
            isLoading: true,
        }
    }
    componentDidMount(){
        const { username } = this.props.route.params
        getUserByName(username).then(data=>{
            this.setState({
                isLoading: false,
                detail : data
            })
        })
    }
    render(){
        const { detail } = this.state
        if(this.state.isLoading){
            return(
                <ActivityIndicator size="large" color="#0000ff"/>
            )
        }

        return(
            <ScrollView style={styles.userDetail} >
                <View style={styles.avatarBox}>
                    <Image style = {styles.avatar}
                           source={ detail.avatar_url? {uri: detail.avatar_url } : require('../../assets/image/default-avatar.png')}/>
                    <Text>{ detail.name || detail.login }</Text>
                </View>
                <View style={styles.socialBox}>
                    <Text>{ detail.bio || '暂无简介' }</Text>
                    <View style={styles.socialDetail}>
                        <TouchableOpacity style={styles.alignCenter}>
                            <Text>{detail.public_repos}</Text>
                            <Text>Repos</Text>
                        </TouchableOpacity>
                        <View style={styles.socialBorder}/>

                        <TouchableOpacity style={styles.alignCenter}
                                          onPress={()=>{this.props.navigation.navigate('followers', {username: detail.login})}}>
                            <Text>{detail.followers}</Text>
                            <Text>Followers</Text>
                        </TouchableOpacity>

                        <View style={styles.socialBorder}/>
                        <TouchableOpacity style={styles.alignCenter}
                            onPress={()=>{this.props.navigation.navigate('following', {username: detail.login})}}>
                            <Text>{detail.following}</Text>
                            <Text>Following</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.socialAction}>
                        <Button title='Follow' style={styles.socialBtn} onPress={()=>{}}/>
                        <Button title='Share' style={styles.socialBtn} onPress={()=>{}}/>
                    </View>
                </View>

                <View style={styles.starBox}>
                    <Text>Starred Repos</Text>
                    <Icon name="star" size={18} color="#000" />
                </View>

                <View style={styles.infoList}>
                    <View style={styles.infoItem}>
                        <Text>Email</Text>
                        <Text>{detail.email || '---'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text>Blog</Text>
                        <Text>{detail.blog}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text>Company</Text>
                        <Text>{detail.company}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text>Location</Text>
                        <Text>{detail.location}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    userDetail: {
      // padding: 20
    },
    avatarBox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 10
    },
    socialBox:{
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 20
    },
    socialDetail: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      marginBottom: 20,
    },
    socialBorder:{
        borderRightColor: '#333',
        borderRightWidth: 1,
        height: '60%',
        alignSelf: 'center'
    },
    socialAction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignSelf: 'stretch',
    },
    alignCenter:{
      alignItems: 'center'
    },
    socialBtn: {
      borderRadius: 6,
      width: 400,
      alignSelf: 'stretch',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    starBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 20,
        marginTop: 20,
        padding: 20
    },
    infoList:{
        marginBottom: 40
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth:1,
        borderBottomColor: '#eee'
    }

})