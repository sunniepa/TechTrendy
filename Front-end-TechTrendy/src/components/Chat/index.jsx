import { useState, useEffect } from 'react'
const Chat = ({
  joinChatRoom,
  connection,
  messages,
  sendMessage,
  user,
  lastUserMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState()
  const [chatRoom, setChatRoom] = useState('Chat')
  const [msg, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setUserName(`${user.given_name} ${user.family_name}`)
    }
  }, [user])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleSubmit = () => {
    joinChatRoom(userName, chatRoom)
  }

  const handleChatSubmit = () => {
    if (msg) {
      sendMessage(userName, 'Admin', msg)
      setMessage('')
    }
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          id="open-chat"
          onClick={handleOpen}
          className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Chat với Admin
        </button>
      </div>
      {isOpen &&
        (!connection ? (
          <div id="chat-container" className="fixed bottom-16 right-4 w-96">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between p-4 text-white bg-blue-500 border-b rounded-t-lg">
                <p className="text-lg font-semibold">Chat</p>
                <button
                  id="close-chat"
                  className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col p-5">
                <button onClick={handleSubmit} type="button">
                  Tiến hành chat
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div id="chat-container" className="fixed bottom-16 right-4 w-96">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between p-4 text-white bg-blue-500 border-b rounded-t-lg">
                <p className="text-lg font-semibold">Chat</p>
                <button
                  id="close-chat"
                  className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div id="chatbox" className="p-4 overflow-y-auto h-80">
                <div className="flex flex-col mb-2 text-right">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`inline-block px-4 py-2 rounded-lg my-1 ${
                        message.sender === userName
                          ? 'text-white bg-blue-500 text-right self-end ml-auto' // Right align for current user
                          : 'text-gray-700 bg-gray-200 self-start mr-auto' // Left align for others
                      }`}
                    >
                      <p className="">
                        {message.msg} - {message.sender}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex p-4 border-t">
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  id="user-input"
                  type="text"
                  value={msg}
                  placeholder="Nhập tin nhắn"
                  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  disabled={!msg}
                  onClick={handleChatSubmit}
                  id="send-button"
                  className={`px-4 py-2  ${
                    !msg
                      ? 'bg-gray-300 opacity-50 cursor-not-allowed'
                      : 'text-white transition duration-300 bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default Chat
