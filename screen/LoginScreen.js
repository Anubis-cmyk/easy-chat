import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View,TextInput ,TouchableOpacity} from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'
import loginImage from'./images/login-image.png'
import {  ToastProvider, useToasts } from 'react-toast-notifications';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { addToast } = useToasts();  
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
        .catch((error) =>  addToast(error.message,{  appearance: "error",autoDismiss: true}));
     };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />
            <Text style={styles.LoginTitle}>Easy Chat</Text>

            <Image source={ loginImage}
              
                style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}>
                 
                      <TextInput 
                   style={styles.input}
                    placeholder='Email'
                    autoFocus
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                   <TextInput 
                   style={styles.input}
                    placeholder='Password' 
                    type='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={signIn}  
                    returnKeyType='go'
                    secureTextEntry
                    autoCorrect={false}/>
            </View>
             <Button
                containerStyle={styles.button}
                type="clear"
                onPress={signIn}
                title="Login"
                titleStyle={{ color: "#fff" }}
            />

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text  style={styles.signUpLink}>Need a Account ? Sign Up</Text>
            </TouchableOpacity>
      


            <View style={{ height: 50 }} />

        </KeyboardAvoidingView>)
}

export default LoginScreen

const styles = StyleSheet.create({
    
    input:{
        padding:10, 
        height: 40,
        margin: 12,  
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        padding: 10,
    },
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
        marginTop:15,
        width: 300,
        marginTop: 10,
        backgroundColor: "#E76565",
        borderRadius: 5,

    },
    LoginTitle:{
        alignText:'center',
        height: 66,
        fontSize:46,
        fontWeight:'400',
        left:55,
        color: '#227721',
        bottom:10,

    },
    signUpLink:{
        marginTop:15,
        fontSize:18,
        lineHeight:22,
        width:250,
        color:'#333FA7',
        left:20,
        top:30
    }

})
