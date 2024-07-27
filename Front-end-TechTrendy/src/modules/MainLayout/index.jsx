import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import Chat from '../../components/Chat'
import { useState, useEffect, useCallback } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const MainLayout = ({ children }) => {
  const [connection, setConnection] = useState()
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null) // New state
  const [lastUserMessage, setLastUserMessage] = useState({}) // New state to store the last message from each user

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5000/chat')
        .configureLogging(LogLevel.Information)
        .build()

      connection.on('ReceiveSpecificMessage', (username, msg) => {
        setMessages((messages) => [...messages, { sender: username, msg }]) // Append new message at the end
      })

      await connection.start()
      await connection.invoke('JoinSpecificChatRoom', { username, chatroom })

      setConnection(connection)
      console.log(messages)
    } catch (error) {
      console.log('Error occurred: ', error)
    }
  }

  const sendMessage = async (sender, recipient, message) => {
    try {
      await connection.invoke('SendMessage', message)
    } catch (error) {
      console.log('Error occurred: ', error)
    }
  }

  const refreshToken = useCallback(async () => {
    if (!isRefreshing) {
      setIsRefreshing(true)
      try {
        const currentRefreshToken = localStorage.getItem('refreshToken')

        const response = await axios.post(
          'https://localhost:5000/api/RefreshToken/refresh-token',
          {
            AccessToken: localStorage.getItem('accessToken'),
            RefreshToken: currentRefreshToken,
          }
        )

        if (response.data.statusCode === 200) {
          console.log(response.data.data)
          localStorage.setItem('accessToken', response.data.data.accessToken)
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
          const decodedToken = jwtDecode(response.data.data.accessToken)
          setUser(decodedToken)
        }
      } catch (error) {
        console.log('Lỗi khi làm mới token:', error.message)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
      } finally {
        setIsRefreshing(false)
      }
    }
  }, [isRefreshing])

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        refreshToken()
      } else {
        setUser(decodedToken)
      }
    }
  }, [refreshToken])

  return (
    <div className="bg-[#f3f3f3]">
      <Header user={user} setUser={setUser} />
      <Outlet />
      <Chat
        joinChatRoom={joinChatRoom}
        connection={connection}
        messages={messages}
        sendMessage={sendMessage}
        user={user}
        lastUserMessage={lastUserMessage}
      />
      <Footer />
    </div>
  )
}

export default MainLayout
