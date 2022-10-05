import { View, Text,FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from "react-native"
import React, {useState, useEffect} from "react"
import {firebase} from '../config'
// import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"


const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    // fetch or read the data from firestore
    useEffect (() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos = []
                    querySnapshot.forEach((doc) => {
                        const {heading} = doc.data()
                        todos.push({
                            id: doc.id,
                            heading,
                    })
                })
                setTodos(todos)
            } 
        )
    }, [])

    // delete a todo from firestore db

    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert("Todo successfully deleted!")
            })
            .catch(error => {
                alert(error);
            })
    }

    // add a todo
    const addTodo = () => {
        // check if we have a todo
        if (addData && addData.length> 0){
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() =>{
                    setAddData('');
                    // release Keyboard
                    Keyboard.dismiss();
                })
                .catch((error) =>{
                    alert(error);
                })
        }
    }
    return (
        <View style={{flex:1}}>
            <Text style= {style.header}>Today's Tasks</Text>
            <View style={style.formcontainer}>
                <TextInput
                    style={style.input}
                    placeholder='Add A New Todo'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                />
                <TouchableOpacity style={style.button} onPress={addTodo}>
                    <Text style={style.buttonText} >Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={style.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                             <TouchableOpacity style={style.buttonDelete} 
                                onPress={() => deleteTodo(item)}>
                                <Text style={style.todoIcon}>Delete</Text>
                            </TouchableOpacity>
                            
                            <View style={style.innerContainer}>
                                <Text style={style.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>
                            </View>    
                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}

export default Home

const style = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding: 15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22,
    },
    formcontainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft:10,
        marginRight:10,
        marginTop: 100,
    },
    input: {
        height: 48,
        borderRadius:5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight:5,
    },
    button: {
        height:47,
        borderRadius:5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    todoIcon: {
        color: 'white',
        fontSize: 16,
    },
    header: {
        textAlign: 'center',
        marginTop: 20,
        fontSize:30,
        color: 'blue',
    },
    buttonDelete:{
        height:50,
        borderRadius:10,
        backgroundColor: 'red',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    }

})