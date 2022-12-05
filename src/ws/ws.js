

const myUser = JSON.parse(localStorage.getItem('user') || '{}')
export const statusSocket = new WebSocket(`wss://web-project-wzlk.onrender.com/ws/notification/${myUser.username}/`)
export const chatSocket = new WebSocket(`wss://web-project-wzlk.onrender.com/ws/message/${myUser.username}/`)
export function test(username) {
    alert(username)
}

// export const chatSocketVar = async () => {
    
//     alert(1)
//     return chatSocket
// }

// export const sendMessageWs = async (username, message) => {
//     chatSocket.onopen = () => chatSocket.send(JSON.stringify({
//         'message': message,
//         'receiver': username
//     }))
//     alert(1)
// }