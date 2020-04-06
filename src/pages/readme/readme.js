import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Markdown  from 'react-native-markdown-renderer';
import { Buffer } from 'buffer'
import Markdownit from 'markdown-it'

export default class Readme extends Component{
    constructor(props){
        super(props)
    }
    render(){
        if(!this.props.content){
            return null
        }
        var content = Buffer.from(this.props.content, 'base64').toString('utf-8');
        const md = Markdownit({
            typographer: true,
            linkify: true,
        });
        md.linkify.tlds('.py', false);  // disables .py as top level domain
        md.linkify.tlds('onion', true)            // Add unofficial `.onion` domain
        md.linkify.add('git:', 'http:')           // Add `git:` protocol as "alias"
        md.linkify.add('ftp:', null)              // Disable `ftp:` ptotocol
        md.linkify.set({ fuzzyIP: true });        // Enable IPs in fuzzy links (without schema)

// add twitter mention handler see https://github.com/markdown-it/linkify-it#example-2-add-twitter-mentions-handler where this is from.
//         md.linkify.add('@', {
//             validate: function (text, pos, self) {
//                 var tail = text.slice(pos);
//
//                 if (!self.re.twitter) {
//                     self.re.twitter =  new RegExp(
//                         '^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
//                     );
//                 }
//                 if (self.re.twitter.test(tail)) {
//                     // Linkifier allows punctuation chars before prefix,
//                     // but we additionally disable `@` ("@@mention" is invalid)
//                     if (pos >= 2 && tail[pos - 2] === '@') {
//                         return false;
//                     }
//                     return tail.match(self.re.twitter)[0].length;
//                 }
//                 return 0;
//             },
//             normalize: function (match) {
//                 match.url = 'https://twitter.com/' + match.url.replace(/^@/, '');
//             }
//         });

        return(
            <View style={styles.readmeBox}>
                <ScrollView >
                    <View style={styles.titleBox}>
                        <Icon name='book' color={'#000'} size={20} />
                        <Text style={styles.title}>readme.md</Text>
                    </View>
                    <View style={styles.markdownBox}>
                        <Markdown style={styles} markdownit={md}>
                            {content}
                        </Markdown>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    markdownBox:{
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 0,
      marginBottom: 400
    },
    // readmeBox:{
    //   paddingBottom: 20
    // },
    readmeBox: {
        // paddingBottom: 50,
        backgroundColor: '#fff',
        // padding: 20
    },
    heading: {
        borderBottomWidth: 1,
        borderColor: '#CED0CE',
        paddingBottom: 10,
        marginBottom: 20,
        paddingTop: 30,
        color: '#000',
        width: '100%'
    },
    heading1: {
        fontSize: 32,
        fontWeight: '700',
        // backgroundColor: '#000',
        color: '#000',
    },
    heading2: {
        fontSize: 24,
    },
    heading3: {
        fontSize: 18,
    },
    heading4: {
        fontSize: 16,
    },
    heading5: {
        fontSize: 13,
    },
    heading6: {
        fontSize: 11,
    },
    codeBlock: {
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#f6f8fa'
    },
    p:{
      // color:'red'
    },
    link:{
      color: '#0366d6',
    },
    list:{
        width: '100%',
    },
    titleBox:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f6f8fa',
      padding: 10,
        borderBottomWidth: 1,
        borderColor: '#CED0CE'

    },
    title:{
        fontSize: 18,
        marginLeft: 10
    }
});