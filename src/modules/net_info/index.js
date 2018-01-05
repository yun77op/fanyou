import { Alert, NetInfo, Modal, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';

let effectiveType = '4g';

const onConnectivityChange = (connectionInfo) => {
    effectiveType = connectionInfo.effectiveType;
}

export const setup = () => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        effectiveType = connectionInfo.effectiveType;
    });

    NetInfo.addEventListener(
        'connectionChange',
        onConnectivityChange
    );
}

export const teardown = () => {
    NetInfo.removeEventListener(
        'connectionChange',
        onConnectivityChange
    );
}

export const getEffectiveType = () => {
    return effectiveType;
}