import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import { NavProps } from '../types/navigationTypes';
import { Input, InputField } from '@gluestack-ui/themed';
import { CColor } from '../theme/CColor';
import CustomLoading from '../component/CustomLoading';
import { PostResponseData, contactAPI } from '../services/api/contact/contactAPIslice';
import { AxiosError, AxiosResponse } from 'axios';
import { addContact } from '../state/contact/contactSlices';
import { AppDispatch } from '../state/store';
import { useDispatch } from 'react-redux';

function AddContactScreen({navigation}:NavProps) {

    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {

    },[])
    
    const submitData = () => {
        setIsLoading(true);

        let bodyAddContact = {
            firstName,
            lastName,
            age: Number(age),
            photo
        }

        contactAPI.addContact(bodyAddContact).then((response:AxiosResponse<PostResponseData>) => {
            setIsLoading(false)
            if (response.status == 201) {
                   dispatch(addContact(bodyAddContact));
                   navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                console.log(`Failed post new data {${response.status}} `);
            }
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
                placeholderTextColor={CColor.text} 
                onChangeText={(text) => {
                    setPhoto(text)
                }}/>
            </Input>

            <TouchableOpacity onPress={() => {
                submitData();
            }} style={styles.containerButton}>
                <Text style={styles.textButton}>Tambah</Text>
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

export default AddContactScreen;