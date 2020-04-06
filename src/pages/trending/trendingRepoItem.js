import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import gStyles from '../../commonStyle'

export default class RepoItem extends Component{
    render(){
        const trend = this.props.item
        return(
            <View style={styles.trendItem} >
                {/*<Text style = {styles.trendTitle} numberOfLines={1}>{ trend.name} / {trend.author}</Text>*/}
                <Text style = {styles.trendTitle} numberOfLines={1}>{ trend.name }</Text>
                <Text style={styles.trendDesc}>{ trend.description }</Text>
                <View style={styles.trendOther}>
                    <Text>{ trend.language }</Text>
                    <View style={ styles.star }>
                        <Icon name="star" size={18} color="#000" />
                        <Text style={gStyles.pl5}>{ trend.stars }</Text>
                    </View>
                    <View style={styles.fork}>
                        <Icon name="code-fork" size={18} color="#000" />
                        <Text style={gStyles.pl5}>{ trend.forks }</Text>
                    </View>
                </View>
                <View style={styles.buildByBox}>
                    <Text>Built by:</Text>
                    {
                        trend.builtBy.map(item=>(
                            <Image source = {{uri: item.avatar}} style={styles.buildByImg} key={item.avatar}/>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    trendItem: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        fontSize: 16,
        borderRadius: 6
    },
    trendTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        flexWrap: 'nowrap',
    },
    trendDesc:{
        fontSize: 16,
        color: '#444'
    },
    trendOther:{
        flexDirection: 'row',
        marginTop:10
    },
    star:{
        flexDirection: 'row',
        paddingLeft: 20
    },
    fork:{
        flexDirection: 'row',
        paddingLeft: 20
    },
    buildByBox: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buildByImg: {
        width: 36,
        height:36,
        borderRadius: 4,
        marginLeft: 10
    }
})
