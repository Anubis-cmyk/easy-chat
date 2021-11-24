import { HeaderTitle } from '@react-navigation/stack'
import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Button, Input ,Avatar} from 'react-native-elements'
// import  Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { db } from '../firebase'
import Firebase from 'firebase';
import CustomListItem from '../components/CustomListItem'
const AddChatScreen = ({ navigation }) => {

 const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

    const onchange= (text) => {
        setInput(text) 
        console.log(chat)
        if(input != ""){
            showChat();
            for(var i = 0 ;i <chat.length ; i++){
                if(input == chat[i].data.name){
                   setChatUsers(
                        chat.map((doc) => ({
                        'id': doc.id,
                        'data': doc.data,
                    }))
                    ) 
                }
            }
        }else{
            setChatUsers([])
        }
        console.log(chatUsers)
    } 

      useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
            userId:  Firebase.auth().currentUser.uid,
        }).then(() => {
            navigation.goBack();
        })
            .catch((error) => alert(error));
    }
 const  showChat =() => {
 
  var curUser = Firebase.auth().currentUser;
 
  var userRef = Firebase.database().ref('user/');
  userRef.on('value', (snapshot) => {
    var chatArr=[];
    const data = snapshot.val();
    for(var i in data){
    chatArr.push([i, data [i]]);}

    setChat(
            chatArr.map((doc) => ({
            'id': doc[0],
            'data': doc[1],
          }))
        ) 
 
  
}); 
  };
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => onchange(text)}
                onSubmitEditing={showChat}

                leftIcon={
                    <IonIcon name="md-chatbubbles-outline" size={24} color="black" />
                }
            />

                <ScrollView contentContainerStyle={{ paddingTop: 15 ,marginTop:10}}>
              {chatUsers.map((data ) =>  {
                  console.log(data.data.name);
                  
                      <View >{data.data.name}</View>
                
                })}
                </ScrollView>
            <Button
                containerStyle={styles.button}
                disabled={!input}
                onPress={createChat}
                title='Create new Chat'
                type="clear"
                titleStyle={{ color: "#fff" }} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },

    button: {
    
        backgroundColor: "#43E68D",
        borderRadius: 5,

    },

})
