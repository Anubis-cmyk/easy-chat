import { HeaderTitle } from '@react-navigation/stack'
import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
// import  Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        })
            .catch((error) => alert(error));
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}

                leftIcon={
                    <IonIcon name="md-chatbubbles-outline" size={24} color="black" />
                }
            />

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
