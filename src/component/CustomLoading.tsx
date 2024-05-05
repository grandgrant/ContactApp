import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Spinner } from '@gluestack-ui/themed'
import Modal from 'react-native-modal';
import { CColor } from '../theme/CColor';


type Props = {
    isShow:boolean,
}


function CustomLoading(props:Props) {
    
    const ref = useRef(null);

    return (
        <Modal
            isVisible={props.isShow}
            coverScreen={false}
            style={styles.container}
        >
            <View>
                <View style={styles.viewLoading}>
                    <Spinner size={'large'} color={CColor.main}/>
                    <Text style={styles.text}>{"Loading"}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewLoading: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: CColor.secondary, 
        padding: 20, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginLeft: 20,
        fontSize: 13,
        color: CColor.text
    }
})

export default CustomLoading;
