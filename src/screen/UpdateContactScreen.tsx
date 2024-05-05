import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { NavProps } from '../types/navigationTypes';
import { CColor } from '../theme/CColor';
import CustomLoading from '../component/CustomLoading';
import { AppDispatch } from '../state/store';
import { useDispatch } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import { Input, InputField } from '@gluestack-ui/themed';
import { contactAPI } from '../services/api/contact/contactAPIslice';
import { Contact, updateContact } from '../state/contact/contactSlices';

function UpdateContactScreen({navigation, route}:NavProps) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("")

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        var data:any = route.params;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAge(data.age.toString());
        setPhoto(data.photo);
        setId(data.id);
    },[]);


    const submitData  = () => {
        setIsLoading(true)

        let bodyUpdateContact = {
            firstName,
            lastName,
            age: Number(age),
            photo
        }

        contactAPI.updateContact(id, bodyUpdateContact).then((value) => {
            setIsLoading(false)

            dispatch(updateContact({
                firstName: firstName,
                lastName: lastName,
                age: Number(age),
                photo: photo,
                id: id
            }))

            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }).catch((error:AxiosError) => {
            setIsLoading(false)
            ToastAndroid.show("Failed to update contact from server", ToastAndroid.LONG);
        })
    }
    
    return (
        <View style={styles.container}>
        <CustomLoading isShow={isLoading}/>
        <Input variant='underlined'
            size='md'
            isDisabled={false}
            isReadOnly={false} 
            style={styles.styleInput}>
            <InputField placeholder='Masukkan Nama Depan Kontak' 
            color={CColor.text}
            defaultValue={firstName}
            placeholderTextColor={CColor.text} onChangeText={(text) => {
                setFirstName(text)
            }}/>
        </Input>

        <Input variant='underlined'
            size='md'
            isDisabled={false}
            isReadOnly={false}
            style={styles.styleInput}>
            <InputField placeholder='Masukkan Nama Belakang Kontak'
            color={CColor.text}
            defaultValue={lastName} 
            placeholderTextColor={CColor.text} 
            onChangeText={(text) => {
                setLastName(text)
            }}/>
        </Input>

        <Input variant='underlined'
            size='md'
            isDisabled={false}
            isReadOnly={false}
            style={styles.styleInput}>
            <InputField placeholder='Masukkan Umur Kontak'
            color={CColor.text}
            defaultValue={age}
            placeholderTextColor={CColor.text} 
            onChangeText={(text) => {
                setAge(text)
            }}/>
        </Input>

        <Input variant='underlined'
            size='md'
            isDisabled={false}
            isReadOnly={false}
            style={styles.styleInput}>
            <InputField placeholder='Masukkan Link Url Photo Kontak'
            color={CColor.text}
            defaultValue={photo}
            placeholderTextColor={CColor.text} 
            onChangeText={(text) => {
                setPhoto(text)
            }}/>
        </Input>

        <TouchableOpacity onPress={() => {
            submitData();
        }} style={styles.containerButton}>
            <Text style={styles.textButton}>Update</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CColor.main,
        paddingHorizontal: 25
    },
    styleInput: {
        marginVertical: 15,
        backgroundColor: CColor.secondary,
        borderRadius: 5
    },
    styleInputField: {
        color: CColor.text
    },
    containerButton: {
        paddingVertical: 20,
        paddingHorizontal: 35,
        backgroundColor: CColor.lightBlue,
        borderRadius: 15,
        marginTop: 20
    },
    textButton: {
        color: CColor.black,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default UpdateContactScreen;