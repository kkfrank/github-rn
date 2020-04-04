import React, { Component } from 'react'
import { Text, View, Image, Button, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons';

export default class TrendingUserItem extends Component{
    render(){
        const item = this.props.item
        return(
            <View style={styles.userItem} >
                <Image source={{uri: item.avatar}} style={styles.userAvatar} />
                <View style={styles.detail}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View>
                        <View style={styles.popular}>
                            <Icon name='flame' color={'#e36209'} size={20} />
                            <Text style={styles.popularText}>POPULAR REPO</Text>
                        </View>
                        <View style={styles.repoBox}>
                            <Icon name='book' color={'#e36209'} size={20} />
                            <Text style={styles.repoName}>{item.repo.name}</Text>
                        </View>
                        <Text>{item.repo.description}</Text>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    popularText:{
       marginLeft: 10,
       marginRight: 10,
       fontSize: 14
    },
    userItem: {
        // flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        // margin: 10,
        marginBottom: 10,
        borderRadius: 6
    },
    userAvatar:{
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10
    },
    popular:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    repoBox:{
        flexDirection: 'row',
        alignItems: 'center'

    },
    detail:{
        flexShrink:1,
    },
    name:{
        fontWeight: '700',
        fontSize: 18
    },
    repoName:{
        // flexShrink:1,
        // flexWrap:'wrap',
        color: '#0366d6',
        fontSize: 18,
        marginLeft: 10,
        // marginRight: 10,
        // whiteSpace: 'wrap'
    }
})