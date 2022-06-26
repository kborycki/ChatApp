const firebaseConfig = {
  apiKey: "AIzaSyAhCrLRCbjaWtGpYd4rUrGEmQi5QldDF-4",
  authDomain: "chat-app-7414f.firebaseapp.com",
  databaseURL:
    "https://chat-app-7414f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-app-7414f",
  storageBucket: "chat-app-7414f.appspot.com",
  messagingSenderId: "399912277236",
  appId: "1:399912277236:web:2fe6400a855c64ac7bbaa1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const chatBox = document.querySelector(".chat");
const username = document.querySelector(".chat-header__username");
const messInput = document.querySelector(".mess_input");
const send = document.querySelector(".fa-paper-plane");
const deleteMess = document.querySelector(".chat-header__delete");

const desktop = document.querySelector(".chat-desktop");

const popup = document.querySelector(".popup");
const joinName = document.querySelector(".box-name__username");
const joinBtn = document.querySelector(".box-name__button");
const error = document.querySelector(".box-name__emptyName");

const nameCheck = () => {
  if (joinName.value === "") {
    error.style.display = "block";
  } else {
    chatBox.classList.remove("hide");
    popup.classList.add("hide");
    desktop.scrollTo(0, desktop.scrollHeight);
  }
  username.innerHTML = joinName.value;
};

const keyEventPopup = (e) => {
  if (e.key === "Enter" && !(joinName.value === "")) {
    chatBox.classList.remove("hide");
    popup.classList.add("hide");
    desktop.scrollTo(0, desktop.scrollHeight);
  } else if (e.key === "Enter" && joinName.value === "") {
    error.style.display = "block";
  }
  username.innerHTML = joinName.value;
};

const sendMessage = () => {
  let message = messInput.value;
  const name = username.innerHTML;
  firebase.database().ref("messages").push().set({
    sender: name,
    message: message,
  });
  messInput.value = "";
  desktop.scrollTo(0, desktop.scrollHeight);
};

firebase
  .database()
  .ref("messages")
  .on("child_added", function (snap) {
    const current = new Date();
    desktop.innerHTML += `
    <div class="chat-desktop__message">
        <p class="chat-desktop__message-username">${snap.val().sender}</p>
        <p class="chat-desktop__message-text">${snap.val().message}</p>
        <p class="chat-desktop__message-time">${current.toLocaleTimeString()}</p>
        <p class="chat-desktop__message-date">${current.toLocaleDateString()}</p>
        </div>
    `;
  });

const keyEvent = (e) => {
  if (e.key === "Enter" && !(messInput.value === "")) {
    sendMessage();
  }
};
const checkInput = () => {
  if (messInput.value === "") {
  } else {
    sendMessage();
  }
};

const deleteMessages = () => {
  firebase.database().ref("messages").remove();
};

firebase
  .database()
  .ref("messages")
  .on("child_removed", function () {
    desktop.innerHTML = ``;
  });

const registerEventHandlers = () => {
  document.addEventListener("keydown", keyEventPopup);
  joinBtn.addEventListener("click", nameCheck);
  document.addEventListener("keydown", keyEvent);
  send.addEventListener("click", sendMessage);
  deleteMess.addEventListener("click", deleteMessages);
};

registerEventHandlers();
