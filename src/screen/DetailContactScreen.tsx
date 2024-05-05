import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { CColor } from '../theme/CColor';
import { NavProps } from '../types/navigationTypes';
import { Contact } from '../state/contact/contactSlices';

function DetailContactScreen({route}:NavProps):React.JSX.Element {

    const [dataContact, setDataContact] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        var data:any = route.params;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAge(data.age);
        setPhoto(data.photo);
    },[])

    const componentText = (title:string, text:string) => {
        return (
            <View style={styles.containerText}>
                <Text style={styles.textTitle}>{title}</Text>
                <Text style={styles.textDesc}>{text}</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            
            <View style={{justifyContent: 'center', alignItems: 'center', }}>
                {photo != "" ? <Image source={{
                    uri: photo
                }} style={{width: 150, height: 150, borderRadius: 75, marginBottom: 20}}/> : <Text style={{fontSize: 16, color: CColor.black}}>{"Invalid url photo"}</Text> }
            </View>

            {componentText("Nama Depan", firstName)}
            {componentText("Nama Belakang", lastName)}
            {componentText("Umur", age)}
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
    containerText: {
        marginVertical: 20,
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 18,
        color: CColor.black,
        fontWeight: 'bold'
    },
    textDesc: {
        fontSize: 14,
        color: CColor.black,
    }
})

export default DetailContactScreen;