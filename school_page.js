function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("Roomname");
    window.location = "index.html";
}

//YOUR FIREBASE LINKS
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC76US95N7402_Y2ZMjhB2NEkR8w2OAUlM",
    authDomain: "school-room-63f2a.firebaseapp.com",
    databaseURL: "https://school-room-63f2a-default-rtdb.firebaseio.com",
    projectId: "school-room-63f2a",
    storageBucket: "school-room-63f2a.appspot.com",
    messagingSenderId: "878694396384",
    appId: "1:878694396384:web:119e616162a29831a47b85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("Roomname");
user_name = localStorage.getItem("user_name");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;

                }
          });
    });
}
getData();

function send() {
    var msg = document.getElementById("msg").value;
    console.log(msg);
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
    });
    document.getElementById("msg").value = " ";
}