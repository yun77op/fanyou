
import Ripple from '../third_parties/Ripple';
import {Alert, AsyncStorage} from 'react-native';

let api;
let oauth_token_secret;

Ripple.setupConsumer({
    consumer_key: '86278fd3861f862d5a61109328b6437d',
    consumer_secret: '0d0d6fbf85af7ff9f4c197a1e1c095a0'
});

const CALLBACK_URL = 'https://boiling-springs-74202.herokuapp.com/callback';

const isCallbackPage = (url) => {
    return url.indexOf(CALLBACK_URL) === 0;
}

const authorize = () => {    
    return Ripple.authorize.withCallbackUrl(CALLBACK_URL)
            .next((args) => {
                oauth_token_secret = args.request_token.oauth_token_secret;

                return args.auth_url;
            })
            .error((resp) => {
                console.error(resp.response);
            });
};

const getAccessToken = (data) => {

    if (data[0] === '?') {
        data = data.slice(1);
    }

    return new Promise((resolve, reject) => {
        Ripple.authorize.generateCallback(data, oauth_token_secret).next((accessToken) => {
            setupAccount(accessToken);

            accessToken = JSON.stringify(accessToken);

            AsyncStorage.setItem('@Fanyou:accessToken', accessToken)
                .then(resolve)
                .catch(reject);
        });
    });
}

const setupAccount = (accessToken) => {
    api = Ripple(accessToken, {
        
    });
}

const loadLocalUser = async () => {

    try {
        const accessToken = await AsyncStorage.getItem('@Fanyou:accessToken');

        if (accessToken === null) {
            return accessToken;
        }

        return JSON.parse(accessToken);
    } catch(e) {
        // Error saving data

        console.error('Error to get accessToken');
        throw new Error('Error to get accessToken');
    }

    return null;
}

const callAPI = (name, options) => {
    return new Promise((resolve, reject) => {
        if (!api) {
            reject(new Error('Fanfou API is not configured'));
            return;
        }

        api[name](options)
            .next((resp) => {
                resolve(resp);
            })
            .error((error) => {
                reject({error});
                console.error(error); 
            });
    });
}

export {authorize, getAccessToken, callAPI, loadLocalUser, setupAccount, isCallbackPage};