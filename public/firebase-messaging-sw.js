importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyC-A62EiTg3ENmLAdg3qIwLlLgp518xz0c",
    authDomain: "social-media-7ece9.firebaseapp.com",
    projectId: "social-media-7ece9",
    storageBucket: "social-media-7ece9.appspot.com",
    messagingSenderId: "854420384988",
    appId: "1:854420384988:web:c780c350a26263d7265819",
    measurementId: "G-LN5CJLP66E",
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);


let messaging = null;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()

    messaging.onBackgroundMessage(function (payload) {
        console.log(payload);
        // console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        const title = payload.data.title;
        const options = {
            body: payload.data.body,
            data: {
                url: payload.data.action_url
            },
            actions: [{
                    action: "open_url",
                    title: "Open social media"
                },
                {
                    action: "open_url",
                    title: "Read more"
                }
            ],
            icon: 'https://ui-avatars.com/api/?name=Swasti+Jain&size=500'
        }
        return self.registration.showNotification(title, options);
    });

    self.addEventListener('notificationclick', function (event) {
        console.log(event)
        switch (event.action) {
            case 'open_url':
                clients.openWindow(event.notification.data.url); //which we got from above
                break;
            case 'any_other_action':
                clients.openWindow("https://www.example.com/");
                break;
            default:
                console.log("pta nhi")
        }
    }, false);
} else {
    console.log('back notifications not supported')
}