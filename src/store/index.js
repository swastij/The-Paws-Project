import {
    createStore
} from 'redux';

import {
    persistStore,
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const initialState = {
    userStore: {
        token: '',
        user: {
            firstname: '',
            lastname: '',
            email: '',
            profile_pic: '',
            username: '',
            gender: '',
            age: '',
            about: ''
        },
    },
    posts: [],
    notification:[]
   
}

function reducer(state, {
    type,
    payload
}) {
    switch (type) {
        case 'SAVE_USER':
            return {
                ...state,
                userStore: payload
            }
            break;
        case 'LOGOUT':
            return {
                ...state,
                userStore: payload
            }
            break;
        case 'SAVE_NOTIF':
            return {
                ...state,
                notification: [...state.notification, payload]
            }
            break;
        default:
            return {
                ...state
            }
            break;

    }
}

const persistConfig = {
    key: 'learningReact',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistedStore = persistStore(store);
export default store;