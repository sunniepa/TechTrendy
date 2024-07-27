import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const OrderHistory = () => {
  const accessToken = localStorage.getItem('accessToken')
  const decodedToken = jwtDecode(accessToken)
  const userId = decodedToken.nameid
  const [orderhistory, setOrderhistory] = useState([])

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5000/api/Order/${userId}`
        )
        const order = response.data.map((detail) => detail.data)
        setOrderhistory(order)

        console.log(order)
      } catch (error) {
        console.error(error)
      }
    }
    getOrder()
  }, [userId])

  const formatCommentDate = (commentDate) => {
    const parsedDate = dayjs(commentDate)

    const formattedDate = parsedDate.format('DD/MM/YYYY')
    return formattedDate
  }

  return (
    <>
      <div className="pt-24 mx-auto lg:max-w-7xl sm:max-w-full">
        <div className="border boxshadow-orderhistory">
          {orderhistory.map((order) => (
            <div key={order.id}>
              {order.orderDetails.map((detail) => (
                <div key={detail.id} className="p-5 mb-4 bg-white">
                  <div className="flex justify-between pb-2 border-b mb-7">
                    <div>
                      <p className="font-normal text-[#26aa99]">
                        Ngày đặt hàng: {formatCommentDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex ">
                      <div className="pr-3 mr-2 border-r text-[#26aa99] font-normal">
                        <p>Giao hàng thành công</p>
                      </div>
                      <div>
                        <p className="text-[#ee4d2d] uppercase">Hoàn thành</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex pb-4 border-b">
                    <div className="flex flex-1">
                      <img
                        src={detail.pictureUrls}
                        alt=""
                        className="w-20 h-20 border border-solid"
                      />
                      <div className="ml-3 font-normal">
                        <p>{detail.name}</p>
                        <span>x{detail.quantity}</span>
                      </div>
                    </div>
                    <p className="m-auto text-[#4F89FC] font-bold">
                      {detail.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                  </div>
                  <div className="flex justify-end py-5">
                    <p className="mr-2 text-xl font-medium ">Thành tiền: </p>
                    <span className="text-[#4F89FC] text-xl">
                      {detail.total.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to={`/products/${detail.productId}`}
                      className="m-h-[40px] m-w-[150px] px-[20px] py-[8px] border border-solid bg-[#ee4d2d] text-white"
                    >
                      Đánh giá
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <p></p>
        </div>
      </div>
    </>
  )
}

export default OrderHistory
