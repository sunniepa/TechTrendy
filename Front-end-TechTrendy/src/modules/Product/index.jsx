import { FaLaptop } from "react-icons/fa6";
import { BsHddFill } from "react-icons/bs";
import { FaMemory } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiMiniCpuChip } from "react-icons/hi2";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../cartSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FeedBack from "../../components/FeedBack";
import Comment from "../../components/Comment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Product = () => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.nameid;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5000/api/Products/${id}`
        );
        setProduct(response.data);
        // console.log(response.data)

        // Lấy danh sách sản phẩm đã xem từ Local Storage
        const viewedProductsLocalStorage =
          JSON.parse(localStorage.getItem("viewedProducts")) || {};
        if (!viewedProductsLocalStorage[userId]) {
          viewedProductsLocalStorage[userId] = [];
        }

        const maxViewedProducts = 4;
        if (viewedProductsLocalStorage[userId].length >= maxViewedProducts) {
          // Nếu số lượng sản phẩm đã xem vượt quá 4, loại bỏ sản phẩm cuối cùng khỏi danh sách
          viewedProductsLocalStorage[userId].pop();
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
        const existingIndex = viewedProductsLocalStorage[userId]?.findIndex(
          (item) => item.id === response.data.id
        );
        if (existingIndex === -1) {
          // Thêm sản phẩm mới vào danh sách từ Local Storage nếu nó chưa tồn tại
          viewedProductsLocalStorage[userId].unshift(response.data);
          localStorage.setItem(
            "viewedProducts",
            JSON.stringify(viewedProductsLocalStorage)
          );
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getProduct();
  }, [id]);

  // Lấy danh sách sản phẩm đã xem từ Local Storage
  const viewedProductsLocalStorage =
    JSON.parse(localStorage.getItem("viewedProducts")) || {};

  const mergedViewedProducts = {
    ...viewedProductsLocalStorage,
  };

  const viewedProductsArray = Object.values(mergedViewedProducts);

  console.log(viewedProductsArray);

  const addToCart = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;
      const productId = id;
      const quantity = 1;

      const response = await axios.post(
        `https://localhost:5000/api/Cart?userId=${userId}&productId=${productId}&quantity=${quantity}`
      );
      console.log(response);
      dispatch(fetchCartCount());
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    } catch (error) {
      console.log("Lỗi khi thêm vào giỏ hàng:", error.message);
    }
  };

  // Kiểm tra xem laptop đã được tải về chưa
  if (!product) {
    return null;
  }

  return (
    <>
      <section className="overflow-hidden text-gray-600 body-font">
        <div>
          <div className="container py-10 mx-auto mb-20 bg-white boxshadow-productdetail">
            <div className="flex mx-auto mb-2 lg:w-4/5 shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)] items-center justify-between">
              <p className="pb-5 text-2xl font-semibold text-[#333333]">
                {product.name}
              </p>
              {/* <div className="pb-5">
                <a href="" className="text-[#0168fa]">
                  18 đánh giá
                </a>
                <span className="px-2">|</span>
                <a href="" className="text-[#0168fa]">
                  29 Hỏi & đáp
                </a>
              </div> */}
            </div>
            <div className="flex pt-6 mx-auto lg:w-4/5">
              <div className="flex flex-wrap items-center justify-center w-1/2">
                <Carousel className="w-full text-center">
                  {product &&
                    Array.isArray(product.pictureUrls) &&
                    product.pictureUrls.map((url, index) => (
                      <img src={url} key={index} alt="" />
                    ))}
                </Carousel>
                <div>
                  <section className="text-gray-600 body-font">
                    <div className="container px-5 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        <div className="p-4">
                          <div className="flex flex-col h-full p-3 bg-[#0088cc14] text-[#8D8D99] rounded-lg">
                            <div className="flex items-center pb-1">
                              <FaLaptop className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.screen}</p>
                            </div>
                            <div className="flex items-center pb-1">
                              <HiMiniCpuChip className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.cpu}</p>
                            </div>
                            <div className="flex items-center pb-1">
                              <FaMemory className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.ram}</p>
                            </div>
                            <div className="flex items-center pb-1">
                              <BsHddFill className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.storage}</p>
                            </div>
                            <div className="flex justify-center">
                              <a
                                className="text-blue-500 cursor-pointer"
                                onClick={() => setOpenModal(true)}
                              >
                                Xem cấu hình chi tiết
                              </a>
                              {openModal &&
                                product.category.name === "Laptop" && (
                                  <>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                                      <div className="relative w-auto max-w-3xl mx-auto my-6">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none h-[80vh]">
                                          {/*header*/}
                                          <div className="flex items-start justify-between p-5 border-b border-gray-200 border-solid rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                              {product.name}
                                            </h3>
                                            <button
                                              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                                ×
                                              </span>
                                            </button>
                                          </div>
                                          {/*body*/}
                                          <div className="relative flex-auto p-6 bg-white">
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thiết kế & Trọng lượng
                                              </p>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Trọng lượng sản phẩm
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.weight}
                                                </p>
                                              </div>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Chất liệu
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  Nhôm
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ xử lý
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Công nghệ CPU
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.cpu}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ nhớ RAM, Ổ Cứng
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Dung lượng RAM
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.ram}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Ổ cứng
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.storage}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Màn hình
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Kích thước màn hình
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.screen}
                                                </p>
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Đồ họa
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Card màn hình
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.graphicsCard}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thông tin khác
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Hệ điều hành
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.os}
                                                </p>
                                              </div>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Cổng kết nối
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  <ul className="list-disc ">
                                                    {product.ports.map(
                                                      (port, index) => (
                                                        <li key={index}>
                                                          {port}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Thời điểm ra mắt
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.releaseDate}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/*footer*/}
                                          <div className="flex items-center justify-end p-6 bg-white">
                                            <button
                                              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              Đóng
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                  </>
                                )}
                              {openModal &&
                                product.category.name === "Tablet" && (
                                  <>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                                      <div className="relative w-auto max-w-3xl mx-auto my-6">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none h-[80vh]">
                                          {/*header*/}
                                          <div className="flex items-start justify-between p-5 border-b border-gray-200 border-solid rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                              {product.name}
                                            </h3>
                                            <button
                                              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                                ×
                                              </span>
                                            </button>
                                          </div>
                                          {/*body*/}
                                          <div className="relative flex-auto p-6 bg-white">
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thiết kế & Trọng lượng
                                              </p>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Trọng lượng sản phẩm
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.weight}
                                                </p>
                                              </div>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Chất liệu
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  Nhôm
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ xử lý
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Công nghệ CPU
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.cpu}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ nhớ RAM, Ổ Cứng
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Dung lượng RAM
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.ram}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Ổ cứng
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.storage}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Màn hình
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Kích thước màn hình
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.screen}
                                                </p>
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Cổng kết nối và camera
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Wifi
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.connectivity}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Camera trước
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.rearCamera}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Camera sau
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.backCamera}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thông tin khác
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Hệ điều hành
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.os}
                                                </p>
                                              </div>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Cổng kết nối
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  <ul className="list-disc ">
                                                    {product.ports.map(
                                                      (port, index) => (
                                                        <li key={index}>
                                                          {port}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Sim
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.sim}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Pin
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.battery}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Thời điểm ra mắt
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.releaseDate}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/*footer*/}
                                          <div className="flex items-center justify-end p-6 bg-white">
                                            <button
                                              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              Đóng
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                  </>
                                )}
                              {/* </Flowbite> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:mt-0">
                <h1 className="mb-1 text-3xl title-font text-[#d70018] font-bold">
                  {product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h1>
                <div className="block">
                  <button
                    onClick={addToCart}
                    className="w-full px-6 py-2 mt-3 text-white bg-indigo-500 border-0 rounded transition-hover focus:outline-none hover:bg-indigo-600"
                  >
                    <p className="font-medium">Mua ngay</p>
                    <p>Giao hàng miễn phí hoặc nhận tại shop</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/5 mx-auto my-auto overflow-hidden ">
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 ">
            <div className="px-4 py-2 mb-4  bg-white shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)] col-span-2">
              <div className="py-4 mb-10 antialiased bg-white dark:bg-gray-900 ">
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
            <div className=" px-4 py-2 mb-4  bg-white shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)]">
              <div className="flex flex-col py-4">
                <p className="mb-3">Thông số kỹ thuật</p>
                <div className="w-full">
                  <table className="w-full font-normal text-[15px]">
                    <tbody>
                      <tr className="bg-[#f3f4f7]">
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          Màn hình
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3 work-break-3">
                          {product.screen}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          CPU
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3">
                          {product.cpu}
                        </td>
                      </tr>
                      <tr className="bg-[#f3f4f7]">
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          RAM
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3">
                          {product.ram}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          Ổ cứng
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3">
                          {product.storage}
                        </td>
                      </tr>
                      {product.category.name === "Laptop" && (
                        <tr className="bg-[#f3f4f7]">
                          <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                            Đồ họa
                          </td>
                          <td className="border border-solid border-[#dee2e6] px-2 py-3">
                            {product.graphicsCard}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          Hệ điều hành
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3">
                          {product.os}
                        </td>
                      </tr>
                      <tr className="bg-[#f3f4f7]">
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          Trọng lượng
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3">
                          {product.weight}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[125px] border border-solid border-[#dee2e6] px-2 py-3">
                          Năm ra mắt
                        </td>
                        <td className="border border-solid border-[#dee2e6] px-2 py-3">
                          {product.releaseDate}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center mt-4">
                    <button
                      className="text-blue-500"
                      onClick={() => setOpen(true)}
                    >
                      Xem cấu hình chi tiết
                    </button>
                  </div>
                  {open && product.category.name === "Laptop" && (
                    <>
                      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                          {/*content*/}
                          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none h-[80vh]">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-gray-200 border-solid rounded-t">
                              <h3 className="text-3xl font-semibold">
                                {product.name}
                              </h3>
                              <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                onClick={() => setOpen(false)}
                              >
                                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative flex-auto p-6 bg-white">
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Thiết kế & Trọng lượng
                                </p>

                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Trọng lượng sản phẩm
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.weight}
                                  </p>
                                </div>

                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Chất liệu</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    Nhôm
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Bộ xử lý
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Công nghệ CPU</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.cpu}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Bộ nhớ RAM, Ổ Cứng
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Dung lượng RAM
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.ram}
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Ổ cứng</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.storage}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Màn hình
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">
                                    Kích thước màn hình
                                  </p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.screen}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Đồ họa
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Card màn hình</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.graphicsCard}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Thông tin khác
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Hệ điều hành
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.os}
                                  </p>
                                </div>

                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Cổng kết nối
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    <ul className="list-disc ">
                                      {product.ports.map((port, index) => (
                                        <li key={index}>{port}</li>
                                      ))}
                                    </ul>
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Thời điểm ra mắt
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.releaseDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 bg-white">
                              <button
                                className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                type="button"
                                onClick={() => setOpen(false)}
                              >
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                  )}
                  {open && product.category.name === "Tablet" && (
                    <>
                      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                          {/*content*/}
                          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none h-[80vh]">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-gray-200 border-solid rounded-t">
                              <h3 className="text-3xl font-semibold">
                                {product.name}
                              </h3>
                              <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                onClick={() => setOpen(false)}
                              >
                                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative flex-auto p-6 bg-white">
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Thiết kế & Trọng lượng
                                </p>

                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Trọng lượng sản phẩm
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.weight}
                                  </p>
                                </div>

                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Chất liệu</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    Nhôm
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Bộ xử lý
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Công nghệ CPU</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.cpu}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Bộ nhớ RAM, Ổ Cứng
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Dung lượng RAM
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.ram}
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Ổ cứng</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.storage}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Màn hình
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">
                                    Kích thước màn hình
                                  </p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.screen}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Cổng kết nối và camera
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Wifi</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.connectivity}
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Camera trước</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.rearCamera}
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="py-2 w-72">Camera sau</p>
                                  <p className="text-[#495057]  w-full py-2">
                                    {product.backCamera}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                  Thông tin khác
                                </p>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Hệ điều hành
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.os}
                                  </p>
                                </div>

                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Cổng kết nối
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    <ul className="list-disc ">
                                      {product.ports.map((port, index) => (
                                        <li key={index}>{port}</li>
                                      ))}
                                    </ul>
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Sim
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.sim}
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Pin
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.battery}
                                  </p>
                                </div>
                                <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <p className="w-72 border-b border-[#edeeef] py-2">
                                    Thời điểm ra mắt
                                  </p>
                                  <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                    {product.releaseDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 bg-white">
                              <button
                                className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                type="button"
                                onClick={() => setOpen(false)}
                              >
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/5 mx-auto my-auto overflow-hidden ">
          {/* <RatingProduct /> */}
          <FeedBack product={product} setProduct={setProduct} userId={userId} />
          <Comment product={product} setProduct={setProduct} userId={userId} />
          <div className="py-4 antialiased bg-white dark:bg-gray-900 lg:py-6 mt-7">
            <p className="px-4 py-2 text-xl">Sản phẩm vừa xem</p>
            <div className="grid gap-4 px-3 pb-3 mt-2 lg:grid-cols-4 md:grid-cols-2">
              {viewedProductsArray.map((userProducts) =>
                userProducts.map((viewedProduct) => (
                  <div key={viewedProduct.id} className="cursor-pointer">
                    <Link to={`/products/${viewedProduct.id}`}>
                      <div className="flex flex-col">
                        <a className="relative flex justify-center w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                          <img
                            alt="ecommerce"
                            className="pt-2 animate-fadeIn group-hover:transition-hover-img transition-hover-product w-[200px] h-[130px]"
                            src={
                              viewedProduct &&
                              viewedProduct.pictureUrls &&
                              viewedProduct.pictureUrls.length > 0
                                ? viewedProduct.pictureUrls[0]
                                : "URL_HÌNH_ẢNH_MẶC_ĐỊNH"
                            }
                            loading="lazy"
                          />
                        </a>
                        <h2 className="mb-1 overflow-hidden text-lg font-normal text-black title-font whitespace-nowrap text-ellipsis">
                          {viewedProduct.name}
                        </h2>
                        <p className="mt-auto text-[#d70018] font-bold">
                          {viewedProduct &&
                            viewedProduct.price &&
                            viewedProduct.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          {/* {viewedProduct.price} */}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
