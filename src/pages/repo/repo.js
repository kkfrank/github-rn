import React, { Component } from 'react'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRepo, getReadme } from '../../api/repo'
import Readme from '../readme/readme'

export default class Repo extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            readme: {},
            detail: {}
        }
    }

    componentDidMount(){
        const { username, reponame } = this.props.route.params
        const getRepoPromise =  getRepo(username, reponame)
        // const getReadmePromise =  getReadme('kezhenxu94','mini-github')
        const getReadmePromise =  getReadme(username, reponame)

        this.props.navigation.setOptions({ title: reponame })

        Promise.all([getRepoPromise, getReadmePromise])
            .then(([detail, readme])=>{
                this.setState({
                    loading: false,
                    detail: detail,
                    readme: readme
                })
            })
    }

    render(){
        if(this.state.loading){
            return(
                <ActivityIndicator size="large" color="#000"/>
            )
        }
        const {detail, readme} = this.state
        const content = readme.content

        return(
            <View style={styles.trendList}>
                <View style={styles.repoNameBox}>
                    <Text style={styles.repoName}>{detail.name}</Text>
                    {
                        detail.description && (
                            <Text style={styles.repoDesc}>{detail.description}</Text>
                        )
                    }
                </View>
                <View style={styles.actionList}>
                    <View style={styles.actionItem}>
                        <Icon name="eye" size={20} color="#000" />
                        <Text style={styles.ml10}>{ detail.watchers_count }</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <Icon name="star" size={20} color="#000" />
                        <Text style={styles.ml10}>{ detail.stargazers_count }</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <Icon name="code-fork" size={20} color="#000" />
                        <Text style={styles.ml10}>{ detail.forks_count }</Text>
                    </View>
                </View>
                <View style={styles.readmeBox}>
                    <Readme content={content}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    trendList:{
        // flex: 1,
        // marginBottom: 450
    },
    title:{
        // backgroundColor: 'red',
        textAlign: 'center',
        fontSize: 24,
        paddingBottom: 20,
        borderBottomColor: '#CED0CE',
        borderBottomWidth: 1
    },
    readmeBox: {
        alignSelf: 'stretch',
        flexGrow:1,
        backgroundColor: '#fff',
        height: '100%'
    },
    repoNameBox: {
      backgroundColor: '#348FED',
      color: '#fff',
      padding: 15,
      alignItems: 'center'
    },
    repoName: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 10
    },
    repoDesc: {
        fontSize: 14,
        color: '#fff',
    },

    actionList:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-around',
        borderBottomColor: '#CED0CE',
        borderBottomWidth: 1
    },
    actionItem:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    ml10:{
        marginLeft: 10
    }
})
