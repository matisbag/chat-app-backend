import app from '@adonisjs/core/services/app'
import Ws from '#services/ws_service'

app.ready(() => {
  Ws.boot()
  const io = Ws.io
  io?.on('connection', (socket) => {
    // console.log('New connection:', socket.id)

    socket.on('joinConversation', (conversationId) => {
      // console.log('Joining conversation:', conversationId)
      socket.join(`conversation_${conversationId}`)
    })

    socket.on('leaveConversation', (conversationId) => {
      // console.log('Leaving conversation:', conversationId)
      socket.leave(`conversation_${conversationId}`)
    })
  })
})
