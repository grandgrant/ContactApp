import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Contact } from '../state/contact/contactSlices';
import { CColor } from '../theme/CColor';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type Props = {
    data: Contact
    onPress:any,
    onIconUpdatePressed:any,
    onIconDeletePressed:any,
}

function CardContact(prop: Props) {
    
    return (
        <TouchableOpacity onPress={prop.onPress} style={styles.container}>
            <View style={styles.containerData}>
                <View>
                    <Text style={styles.textTitle}>{"Nama Lengkap"}</Text>
                    <Text style={styles.textChild}>{`${prop.data.firstName} ${prop.data.lastName}`}</Text>
                </View>
                
                <View>
                    <Text style={styles.textTitle}>{"Age"}</Text>
                    <Text style={styles.textChild}>{prop.data.age}</Text>
                </View>
            </View>
            
                
            <View style={styles.containerIcons}>
                <MaterialIcon name='edit' size={30} color={CColor.black} style={[styles.icon, {marginRight: 5}]} onPress={prop.onIconUpdatePressed}/>
                <MaterialIcon name='delete' size={30} color={CColor.red} style={styles.icon} onPress={prop.onIconDeletePressed}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#addedb',
        padding: 15,
        margin: 20,
    }, 
    containerData: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000000"
    }, 
    textChild: {
        fontSize: 14,
        color: CColor.black,
        marginLeft: 10
    },
    containerIcons: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20

    },
    icon : {
        padding: 10
    }
})

export default CardContact;