import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp')
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token').replace(/\s/g, '+')
    const email = urlParams.get('email')

    try {
      const response = await axios.post(
        'https://localhost:5000/api/Accounts/reset-password',
        {
          Password: password,
          ConfirmPassword: confirmPassword,
          Email: email,
          Token: token,
        }
      )
      console.log(token)
      console.log(email)
      console.log(response)
      alert('Mật khẩu đã được thay đổi')
      navigate('/login')
    } catch (error) {
      alert('Đã xảy ra lỗi')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-white sm:bg-gray-200">
      <div className="w-full h-screen px-8 py-8 bg-white shadow-none sm:shadow-lg sm:px-12 xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 sm:h-auto">
        <div className="w-full p-4 text-3xl font-bold text-center text-gray-600">
          Nhập mật khẩu mới
        </div>
        <div className="w-full my-3 bg-gray-200"></div>
        <form>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="text-gray-700">Mật khẩu mới</label>

              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="email"
              />
            </div>
            <div>
              <label className="text-gray-700">Nhập lại mật khẩu</label>

              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="email"
              />
            </div>
            <div className="w-full">
              <button
                className="flex flex-row items-center justify-center w-full gap-1 p-2 text-indigo-500 duration-100 ease-in-out border border-indigo-500 hover:bg-indigo-500 hover:text-white"
                type="button"
                onClick={handleSubmit}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
