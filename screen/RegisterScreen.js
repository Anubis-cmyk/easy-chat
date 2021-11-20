import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        })
    }, [navigation])

    const register = () => {

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl ||
                        "https://www.pinclipart.com/picdir/big/78-780477_about-us-avatar-icon-red-png-clipart.png",

                })
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />

            <Text h4 style={{ marginBottom: 50 }}>
                Create a EasyChat account
            </Text>
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

            <View style={{ height: 100 }} />

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
