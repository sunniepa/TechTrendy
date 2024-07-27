import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useState } from "react";

const Comment = ({ product, setProduct, userId }) => {
  const [commentText, setCommentText] = useState("");
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);

  const getUpdatedProductData = async (productId) => {
    const response = await axios.get(
      `https://localhost:5000/api/Products/${productId}`
    );
    return response.data;
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post("https://localhost:5000/api/Comment", {
        UserId: decodedToken.nameid,
        ProductId: product.id,
        Content: commentText,
        IsQuestion: true,
      });

      const updatedProduct = await getUpdatedProductData(product.id);
      setProduct(updatedProduct);
      setReplyingToCommentId(null);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyClick = async (parentCommentId) => {
    try {
      await axios.post("https://localhost:5000/api/Comment", {
        UserId: decodedToken.nameid,
        ProductId: product.id,
        Content: commentText,
        ParentId: parentCommentId,
        IsQuestion: true,
      });
      const updatedProduct = await getUpdatedProductData(product.id);
      setProduct(updatedProduct);
      setCommentText("");
      setReplyingToCommentId(null); // Đặt lại trạng thái replyingToCommentId về null
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId, productId) => {
    try {
      await axios.delete("https://localhost:5000/api/Comment", {
        data: {
          CommentId: commentId,
          ProductId: productId,
        },
      });

      // Sau khi xóa thành công, cập nhật lại danh sách comment
      const updatedProduct = await getUpdatedProductData(productId);
      setProduct(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCommentDate = (commentDate) => {
    // Parse the ISO-formatted date string
    const parsedDate = dayjs(commentDate);

    // Format the date as 'DD/MM/YYYY'
    const formattedDate = parsedDate.format("DD/MM/YYYY");
    return formattedDate;
  };
  return (
    <section className="py-4 antialiased bg-white dark:bg-gray-900 lg:py-6">
      <div className="w-full">
        <div className="px-4 py-2 mb-4 text-center bg-white shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)]">
          <div className="flex items-center justify-between mb-6 ">
            <h2 className="text-lg font-bold text-gray-900 lg:text-xl dark:text-white">
              Đánh giá & nhận xét
            </h2>
          </div>
        </div>
        <div className="p-6">
          <p>
            {/* Người bình luận: <span className="text-blue-600"></span> */}
            <div className="relative">
              <div>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  name=""
                  id=""
                  placeholder="Nhập nội dung bình luận"
                  className="block resize-none w-full h-20 border border-solid border-[#cbd1d6] rounded-[4px] px-2 py-1 focus:textarea-focus focus:outline-none mt-2"
                ></textarea>
                <button
                  onClick={handleCommentSubmit}
                  type="button"
                  className="absolute right-3 translate-y-1/2 -top-3 bg-[#d7000e] border-none rounded-xl my-3 mx-auto py-2 px-6 text-white "
                >
                  Gửi bình luận
                </button>
              </div>
            </div>
          </p>
        </div>
        {product.comments.map((comment) => (
          <div key={comment.key}>
            {comment.isQuestion === true && (
              <div>
                {comment.parentId ? (
                  // Hiển thị thông tin của comment con
                  <article className="p-6 mb-3 ml-6 text-base bg-white rounded-lg lg:ml-12 dark:bg-gray-900">
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
                      {replyingToCommentId === comment.id ? (
                        <div className="relative w-full">
                          <div>
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
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => setReplyingToCommentId(comment.id)}
                          >
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
    </section>
  );
};

export default Comment;
