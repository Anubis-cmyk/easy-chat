import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace('Home');
            }
        })

        return unsubscribe;
    }, [])

    const signIn = () => {

        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
     };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />

            <Image source={{
                uri: 'https://cdn5.f-cdn.com/contestentries/892698/21718995/5833c0af64c61_thumb900.jpg'
            }}
                style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input
                    placeholder='Password'
                    autoFocus
                    type='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={signIn}/>
            </View>

            <Button
                containerStyle={styles.button}
                type="clear"
                onPress={signIn}
                title="Login"
                titleStyle={{ color: "#fff" }}
            />

            <Button
                containerStyle={styles.button}
                onPress={() => navigation.navigate("Register")}
                type=""
                title="Register"
                titleStyle={{ color: "#fff" }}
            />

            <View style={{ height: 50 }} />

        </KeyboardAvoidingView>)
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: "#43E68D",
        borderRadius: 5,

    },

})
