import React, { useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState ,useEffect} from "react";
import * as firebase from "firebase";
import { db, auth } from "../firebase";

import Firebase from 'firebase';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",

      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            // source={{
            //   uri: messages[0]?.data.photoURL,
            // }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={23} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="call" size={23} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

   const  sendMessage = () => { 
      Keyboard.dismiss();
        
        var curUser = Firebase.auth().currentUser;

         const chat = {
              'message': input,
              'displayName': curUser.displayName,
              'email': curUser.email,
              'photoURL': curUser.photoURL,
              'uid':curUser.uid,
         }; 

        let path = 'user/' + curUser.uid +'/chat'; 
        Firebase.database().ref('/').child(path).push().set(chat);
        console.log('DATA SAVED' + curUser.uid); 
        setInput("");
        }

  // const sendMessage = () => {
  //   Keyboard.dismiss();

  //   db.collection("chats").doc(route.params.id).collection("messages").add({
  //    // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     message: input,
  //     displayName: auth.currentUser.displayName,
  //     email: auth.currentUser.email,
  //     photoURL: auth.currentUser.photoURL,
  //   });
  //   setInput("");
  // }; 
 
  useLayoutEffect(() => {
  //   const unsubscribe = db
  //     .collection('chats')
  //     .doc(route.params.id)
  //     .collection('messages')
  //     .orderBy('timestamp', 'asc')
  //     .onSnapshot((snapshot) =>
  //       setMessages(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  //   return unsubscribe;
  var curUser = Firebase.auth().currentUser;
 
  var starCountRef = Firebase.database().ref('user/' + curUser.uid +'/chat');
  starCountRef.on('value', (snapshot) => {
    var chatArr=[];
    const data = snapshot.val();
    for(var i in data){
    chatArr.push([i, data [i]]);}

    setMessages(
            chatArr.map((doc) => ({
            'id': doc[0],
            'data': doc[1],
          }))
        )
     console.log(data);
     console.log(chatArr);
 
  
}); 
  }, [route]);
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? ( 
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      rounded
                      //Web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>  
                    <Avatar
                      position="absolute"
                      rounded
                      //Web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.buttonrow}>
                <TouchableOpacity  style={styles.icon} activeOpacity={0.5}  onPress={() => navigation.navigate("Camera")}>
                <Ionicons name="recording" size={23} color="#be0c57" />
              </TouchableOpacity>
               <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
                <Ionicons name="hand-right" size={23} color="#be0c57" />
              </TouchableOpacity>
               <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
                <Ionicons name="mic" size={23} color="#be0c57" />
              </TouchableOpacity>
               <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
                <Ionicons name="thumbs-up" size={23} color="#be0c57" />
              </TouchableOpacity>
              </View>
              <View style={styles.chatRow}>
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder="EasyChat Message"
              />

              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={23} color="#43E68D" />
              </TouchableOpacity>
              </View> 
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatRow:{
     display:'flex',
    flexDirection:'row',
    width:'100%',
    alignItems:'center'
  },
  icon:{
    margin:3,
    marginLeft:20,
    padding:1, 

  },
  buttonrow:{ 
    display:'flex',
    flexDirection:'row',
    width:'100%',
    marginBottom:5,
    

  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },

  footer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
});
