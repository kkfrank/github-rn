import React, { Component } from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'

export default class ActivityItem extends Component{
    render(){
        const { item } = this.props
        const repoAuthor = item.repo.name.split('/')[0]
        const repoName = item.repo.name.split('/')[1]

        return(
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('trendingRepoDetail',{username: repoAuthor, reponame: repoName})
            }}>
                <View style={styles.activityItem}>
                    <Image source={{uri: item.actor.avatar_url}} style={styles.avatar}/>
                    <View>
                        <View style={styles.nameBox}>
                            <Text style={styles.name}>{item.actor.login}</Text>
                            <Text>{item.payload.action}</Text>
                        </View>
                        <View>
                            <Text>{item.repo.name}</Text>
                            <Text>{item.created_at}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    activityItem: {
     flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 4,
      marginBottom: 10,
      padding: 20,
      alignItems: 'center'
    },
    nameBox:{
        flexDirection: 'row'
    },
    name: {
      marginRight: 5,
      fontWeight: '700'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10
    }
})