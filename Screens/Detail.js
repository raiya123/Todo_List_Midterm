import { View, Text, TextInput, StyleSheet, Pressable } from "react-native"
import React, {useInsertionEffect, useState} from "react"
import {firebase} from '../config';
import { useNavigation } from "@react-navigation/native";


const Detail = ({route}) => {
    const todoRef = firebase.firestore().collection('todo');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();
    
    const updateTodo = () => {
        if (textHeading && textHeading.length > 0){
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then (() => {
                navigation.navigate('Home')
            }).catch((error) => {
                alert(error.message)
            })
        }
    }
    return (
        <View style={style.container}>
            <Text style= {style.header}>Update Todo Form</Text>
            <TextInput
                style={style.textField}
                onChangeText={onChangeHeadingText}
                value={textHeading}
                placeholder= "Update Todo"
            />
            <Pressable
                style={style.buttonUpdate}
                onPress={() => {updateTodo()}}
            >
                <Text>UPDATE TODO</Text>
            </Pressable>
        </View>
    )
}

export default Detail

const style = StyleSheet.create({
    container:{
        marginTop: 80,
        marginLeft:15,
        marginRight:15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize:15,
        color: '#000000',
        backgroundColor:'#e0e0e0',
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal:32,
        paddingVertical:12,
        borderRadius:10,
        // elevation:10,
        backgroundColor: '#0de065',
    },
    header: {
        textAlign: 'center',
        marginTop: -50,
        paddingBottom: 30,
        fontSize:30,
        color: 'blue',
    }
})