import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
const Register = () => {
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault()
  }
  const signUp = async () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu và mật khẩu xác nhận không khớp. Vui lòng thử lại.')
      return
    }

    try {
      const response = await axios.post(
        'https://localhost:5000/api/Accounts/SignUpCustomer',
        {
          UserName: userName,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
          ConfirmPassword: confirmPassword,
        }
      )

      if (response.status === 201) {
        alert('Đăng ký thành công')
      }
      navigate('/login')
    } catch (error) {
      if (error.response) {
        console.log('Lỗi từ server:', error.response.data)
      } else if (error.request) {
        console.log('Không nhận được phản hồi từ server:', error.request)
      } else {
        console.log('Lỗi khi thiết lập yêu cầu:', error.message)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white sm:bg-gray-200">
      <div className="w-full h-screen px-8 py-8 bg-white shadow-none sm:shadow-lg sm:px-12 xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 sm:h-auto">
        <div className="w-full text-3xl font-bold text-center text-gray-600">
          Đăng ký
        </div>
        <div className="w-full my-3 bg-gray-200"></div>
        <form>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="text-gray-700">Tên tài khoản</label>
              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Tên đăng nhập"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Tên</label>
              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Tên"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700">Họ</label>
              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Họ"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Email đăng nhập</label>
              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Mật khẩu</label>
              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Nhập lại mật khẩu</label>
              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Nhập lại mật khẩu"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="w-full">
              <button
                className="flex flex-row items-center justify-center w-full gap-1 p-2 text-indigo-500 duration-100 ease-in-out border border-indigo-500 hover:bg-indigo-500 hover:text-white"
                type="button"
                onClick={signUp}
              >
                Đăng ký
              </button>
            </div>

            <div className="flex flex-row items-center justify-center ">
              <p>
                Bạn đã có tài khoản?{' '}
                <Link to="/login" className="text-blue-600 cursor-pointer">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
