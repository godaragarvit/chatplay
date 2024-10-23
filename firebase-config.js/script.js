//initialize firebase app
const app = initializeApp(firebaseConfig)
const Auth = getAuth()
const database = getDatabase()

//sign in with google
loginButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(Auth, provider)
        .then((result) => {
            // Hide login  page and show chat page after successful login
            loginPage.classList.add('hidden')
            chatPage.classList.remove('hidden')
        })
        .catch((error) => {
            console.log('Error during login', error)
        })
})

//sign out 
logoutButton.addEventListener('click', () =>{
    signOut(auth).then(() => {
        //show login page and hide chat page after successful logout
        loginPage.classList.remove('hidden')
        chatPage.classList.add('hidden')
    })
})

//send message 
sendButton.addEventListener('click', () => {
    //Git message from input field 
    const message = messageInput.value
    if (message) {
        //reference to the 'messsages' node in the database
        const messagesRef = ref(database, 'messages')
        //push new message to the database with user info and timestamp
        PushManager(messageRef, {
            user: Auth.currentUser.displayName,
            message: message,
            timestamp: new Date().toISOString()
        })
        // clear the input field after sending the message
        messageInput.value = ''
    }
})


//Display messages
//Reference to the 'messages' node in the database

const messagesRef = ref(database, 'messages')
