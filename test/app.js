const gridElement = document.getElementsByClassName('chat-container')[0]
const conversations = document.getElementsByClassName('conversations')[0]
const backButton = document.getElementById('back-button')
const conversationsModeClass = 'conversations-mode'
const messagesModeClass = 'messages-mode'

conversations.addEventListener('click', () => {
  gridElement.classList.remove(conversationsModeClass)
  gridElement.classList.add(messagesModeClass)
})

backButton.addEventListener('click', () => {
  gridElement.classList.remove(messagesModeClass)
  gridElement.classList.add(conversationsModeClass)
})
