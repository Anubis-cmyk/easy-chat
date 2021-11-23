import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View ,TouchableOpacity} from 'react-native'
import { Button, Input, Text,Image } from 'react-native-elements'
import { auth,app } from '../firebase' 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Firebase from 'firebase';
import {  ToastProvider, useToasts } from 'react-toast-notifications';
 
import loginImage from'./images/login-image.png'
 
const RegisterScreen = ({ navigation }) => {

    const [error,setError] =useState("")
    const [errorType,setErrorType] =useState("")
    const [showError,setShowError] =useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [userName,seUserName] = useState(""); 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        })
    }, [navigation])

    const register = () => {
      if( email =="" && password  ==""  && name  ==""  ) {
           addToast("fill the information",{ appearance: "info",autoDismiss: true,placement :"top-right"})
      }else{
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl ||
                        "https://www.pinclipart.com/picdir/big/78-780477_about-us-avatar-icon-red-png-clipart.png",

                })
                writeUserData();
            })
            .catch(error => { 
               console.log(error.message)
            }) 
        }
    }

    const  writeUserData = () => { 
        
        var curUser = Firebase.auth().currentUser;

         const newUser = {
            "userName":userName,
            "profilePic":imageUrl,
            "name":name,
            "phoneNumber":number,
            "email": email,
            "password" :password,
            "uid":curUser.uid,
         }; 

        let path = 'user/' + curUser.uid; 
        Firebase.database().ref('/').child(path).set(newUser);
        console.log('DATA SAVED' + curUser.uid);
        console.log("newUser : " + newUser); 
           
        }

    return (
       
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
          <Text style={styles.LoginTitle}>Easy Chat</Text>

      
            
       
            <Text h4 style={{ marginBottom: 50 }}>
                Create a EasyChat account
            </Text>
              <Image source={  loginImage 
                 
            } 
                style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}> 
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Input
                    placeholder="Email"
                    type='text'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="Password"
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                
               
                <Input
                    placeholder="Profile Picture URL (Optional)"
                    type='text'
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title='Register'
                type="clear"
                titleStyle={{ color: "#fff" }}
            />
            <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
            <Text  style={styles.LoginLink}>Already have an account ? Sign In</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} /> 
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
        flex: 1,
        alignItems: "center", 
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 300,
        marginTop: 10,
        backgroundColor: "#E76565",
        borderRadius: 5,

    },
    LoginTitle:{ 
        height: 66,
        fontSize:46,
        fontWeight:'400',
        color: '#227721',
        bottom:10,

    },

    LoginLink:{
        fontSize:18,
        lineHeight:22,
        width:280,
        color:'#333FA7',
        left:10,
        top:20,
        marginTop:15,
    }


})
