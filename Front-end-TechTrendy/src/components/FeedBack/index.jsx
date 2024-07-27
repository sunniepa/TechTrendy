import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
const FeedBack = ({ product, setProduct, userId }) => {
  const [openModal, setopenModal] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false)
  const [userOrderHistory, setUserOrderHistory] = useState([])

  const accessToken = localStorage.getItem('accessToken')
  const decodedToken = jwtDecode(accessToken)

  const getUpdatedProductData = async (productId) => {
    const response = await axios.get(
      `https://localhost:5000/api/Products/${productId}`
    )
    return response.data
  }

  const handleCommentSubmit = async () => {
    try {
      await axios.post('https://localhost:5000/api/Comment', {
        UserId: decodedToken.nameid,
        ProductId: product.id,
        Content: commentText,
      })

      const updatedProduct = await getUpdatedProductData(product.id)
      setProduct(updatedProduct)
      setIsReplyFormOpen(false)
      setopenModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleReplyClick = async (parentCommentId) => {
    try {
      await axios.post('https://localhost:5000/api/Comment', {
        UserId: decodedToken.nameid,
        ProductId: product.id,
        Content: commentText,
        ParentId: parentCommentId,
      })
      const updatedProduct = await getUpdatedProductData(product.id)
      setProduct(updatedProduct)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteComment = async (commentId, productId) => {
    try {
      await axios.delete('https://localhost:5000/api/Comment', {
        data: {
          CommentId: commentId,
          ProductId: productId,
        },
      })

      // Sau khi xóa thành công, cập nhật lại danh sách comment
      const updatedProduct = await getUpdatedProductData(productId)
      setProduct(updatedProduct)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {}, [product])

  const formatCommentDate = (commentDate) => {
    const parsedDate = dayjs(commentDate)

    const formattedDate = parsedDate.format('DD/MM/YYYY')
    return formattedDate
  }

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5000/api/Order/${decodedToken.nameid}`
        )
        const order = response.data.map((detail) => detail.data)
        setUserOrderHistory(order)

        console.log(order)
      } catch (error) {
        console.error(error)
      }
    }
    getOrder()
  }, [decodedToken.nameid])

  const hasOrderedProduct = (productId) => {
    return userOrderHistory.some((order) =>
      order.orderDetails.some((detail) => detail.productId === productId)
    )
  }

  const hasUserReviewed = (userId) => {
    return product.comments.some((comment) => comment.userId === userId)
  }

  return (
    <section className="py-4 mb-10 antialiased bg-white dark:bg-gray-900 lg:py-6">
      <div className="w-full">
        <div className="">
          {hasOrderedProduct(product.id) ? (
            hasUserReviewed(userId) ? (
              <p className="text-2xl text-center">
                Bạn đã đánh giá sản phẩm này
              </p>
            ) : (
              <div className="px-4 py-2 mb-4 text-center bg-white shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)]">
                <div className="flex items-center justify-between mb-6 ">
                  <h2 className="text-lg font-bold text-gray-900 lg:text-xl dark:text-white">
                    Đánh giá & nhận xét {product.name}
                  </h2>
                </div>
                <form className="mb-6">
                  <div>
                    <p>Bạn đánh giá như thế nào về sản phẩm ?</p>
                    <button
                      className="bg-[#d7000e] border-none rounded-xl my-3 mx-auto py-3 px-8 text-white "
                      onClick={() => setopenModal(true)}
                      type="button"
                    >
                      Đánh giá ngay
                    </button>
                    {openModal && (
                      <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                          <div className="relative w-full max-w-3xl mx-auto my-6 bg-white">
                            <div className="shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)] ">
                              <div className="flex justify-between py-[10px] px-[24px] items-center">
                                <p className="items-center text-2xl font-semibold text-justify">
                                  Đánh Giá Sản Phẩm
                                </p>
                                <IoClose
                                  className="text-2xl cursor-pointer"
                                  onClick={() => setopenModal(false)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-center py-5">
                              <div className="max-w-[96px]">
                                <img src={product.pictureUrl} alt="" />
                              </div>
                              <p className="text-xl font-semibold">
                                {product.name}
                              </p>
                            </div>
                            <div className="mt-3 py-[10px] px-[24px]">
                              <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                name=""
                                id=""
                                placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                                className="resize-none w-full h-20 border border-solid border-[#cbd1d6] rounded-[4px] px-2 py-1 focus:textarea-focus focus:outline-none"
                              ></textarea>
                            </div>
                            <button
                              type="button"
                              className="bg-[#d7000e] border-none rounded-xl my-3 mx-auto py-3 px-8 text-white "
                              onClick={handleCommentSubmit}
                            >
                              Hoàn tất
                            </button>
                          </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                      </>
                    )}
                  </div>
                </form>
              </div>
            )
          ) : (
            <p className="text-2xl text-center">Hãy mua sản phẩm để đánh giá</p>
          )}
          <div>
            {product.comments.map((comment) => (
              <div key={comment.key}>
                {comment.isQuestion === false && (
                  <div>
                    {comment.parentId ? (
                      // Hiển thị thông tin của comment con
                      <article className="p-6 mb-3 ml-6 text-base bg-white rounded-lg lg:ml-12 dark:bg-gray-900">
                        <footer className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm font-semibold text-blue-600 dark:text-white">
                              {comment.user.firstName} {comment.user.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatCommentDate(comment.date)}
                            </p>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                          {comment.content}
                        </p>
                      </article>
                    ) : (
                      // Hiển thị thông tin của comment cha
                      <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
                              {comment.user.firstName} {comment.user.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatCommentDate(comment.date)}
                            </p>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                          {comment.content}
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                          {/* Thêm phần reply form nếu cần */}
                          {isReplyFormOpen ? (
                            <div className="relative w-full">
                              <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                name=""
                                id=""
                                placeholder="Nhập nội dung bình luận"
                                className="block resize-none w-full h-20 border border-solid border-[#cbd1d6] rounded-[4px] px-2 py-1 focus:textarea-focus focus:outline-none mt-2"
                              ></textarea>
                              <button
                                onClick={() => handleReplyClick(comment.id)}
                                className="absolute right-3 translate-y-1/2 -top-3 bg-[#d7000e] border-none rounded-xl my-3 mx-auto py-2 px-6 text-white "
                              >
                                Gửi bình luận
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button onClick={() => setIsReplyFormOpen(true)}>
                                Trả lời
                              </button>
                              {comment.userId === userId && (
                                <button
                                  key={comment.id}
                                  onClick={() =>
                                    handleDeleteComment(comment.id, product.id)
                                  }
                                  className="ml-3"
                                >
                                  Xóa bình luận
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </article>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedBack
