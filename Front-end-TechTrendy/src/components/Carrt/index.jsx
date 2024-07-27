import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useCallback } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { decrement } from "../../cartSlice";
import UserAddress from "../UserAddress";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import voucherimg from "../../assets/voucher.png";
import notfound from "../../assets/notfound.png";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import cod from "../../assets/cod.png";
import vnpay from "../../assets/vnpaymethod.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [displayAddress, setDisplayAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectDiscount, setSelectDiscount] = useState(false);
  const [voucher, setVoucher] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }

      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      const response = await axios.get(
        `https://localhost:5000/api/Cart/${userId}`
      );

      setCartItems(response.data.data.cartItems);
      const amount = response.data.data.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalAmount(amount);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  const calculateDiscountAmount = (totalAmount, percent, maxDiscountAmount) => {
    const discountAmount = (totalAmount * percent) / 100;
    return discountAmount > maxDiscountAmount
      ? maxDiscountAmount
      : discountAmount;
  };

  const selectedVoucherDetails = voucher.find(
    (v) => v.code === selectedVoucher
  );

  const discountAmount = selectedVoucherDetails
    ? calculateDiscountAmount(
        totalAmount,
        selectedVoucherDetails.percent,
        selectedVoucherDetails.maxDiscountAmount
      )
    : 0;

  const totalAfterDiscount = totalAmount - discountAmount;

  const removeFromCart = async (productId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      await axios.delete(
        `https://localhost:5000/api/Cart/Remove?userId=${userId}&productId=${productId}`
      );

      console.log(`Removed product with ID: ${productId}`);

      setCartItems(cartItems.filter((item) => item.productId !== productId));
      dispatch(decrement());
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      await axios.delete(
        `https://localhost:5000/api/Cart/Decrease?userId=${userId}&productId=${productId}&quantity=1`
      );

      fetchCart();
    } catch (error) {
      console.error("Error decreasing quantity:", error.message);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      await axios.post(
        `https://localhost:5000/api/Cart?userId=${userId}&productId=${productId}&quantity=1`
      );

      fetchCart();
    } catch (error) {
      console.error("Error increasing quantity:", error.message);
    }
  };

  const fetchVoucher = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      const response = await axios.get(
        `https://localhost:5000/api/Discount/${userId}`
      );
      setVoucher(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchVoucher();
  }, []);

  console.log(voucher);
  useEffect(() => {
    const getAddress = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.nameid;
        const response = await axios.get(
          `https://localhost:5000/api/UserAddress/${userId}`
        );
        setUserAddress(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getAddress();
  }, []);

  const onAddressUpdate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      const response = await axios.get(
        `https://localhost:5000/api/UserAddress/${userId}`
      );
      setUserAddress(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (userAddress && userAddress.length > 0) {
      setDisplayAddress(userAddress[0]);
    }
  }, [userAddress]);

  useEffect(() => {
    if (selectedAddress) {
      setDisplayAddress(selectedAddress);
      // Kiểm tra xem địa chỉ đã được xác nhận chưa trước khi log
      if (!isChangeAddress) {
        console.log(displayAddress);
        console.log(displayAddress.id);
      }
    }
  }, [selectedAddress, isChangeAddress]);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const handleUpdateClick = () => {
    setIsChangeAddress(false);
  };

  const handleUpdateAddressClick = (address) => {
    setSelectedAddress(address);
    setIsOpen(true);
    setIsChangeAddress(false);
  };

  const handleOpenAddressClick = () => {
    setIsChangeAddress(false);
    setIsOpen(true);
  };

  const handleOrder = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.nameid;

      const paymentMethodElement = document.querySelector(
        'input[name="paymentMethod"]:checked'
      );
      if (!paymentMethodElement) {
        alert("Vui lòng chọn phương thức thanh toán trước khi đặt hàng.");
        return;
      }
      const paymentMethod = paymentMethodElement.value;

      if (!displayAddress) {
        toast.error("Bạn chưa nhập địa chỉ nhận hàng", {
          autoClose: 5000,
        });
        setIsOpen(true);
      }
      const orderData = {
        CreatedAt: new Date(),
        OrderStatus: "New",
        ShippingType: "Standard",
        ShippingDate: new Date(), // Set this to the desired shipping date
        TrackingNumber: "123456789", // Set this to the tracking number, if available
        Carrier: "Giao hàng nhanh", // Set this to the carrier, if available
        PaymentType: paymentMethod,
        PaymentStatus: "Pending",
        PaymentDate: new Date(), // Set this to the payment date
      };
      let response;

      if (selectedVoucher) {
        response = await axios.post(
          `https://localhost:5000/api/Order?userId=${userId}&code=${selectedVoucher}&addressId=${displayAddress.id}`,
          orderData
        );
      } else {
        response = await axios.post(
          `https://localhost:5000/api/Order?userId=${userId}&addressId=${displayAddress.id}`,
          orderData
        );
      }

      if (response.status === 201) {
        toast.success("Đặt hàng thành công!");
        // Đặt thời gian chờ trước khi tải lại trang
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Chờ 5 giây trước khi tải lại trang
      } else {
        toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
      }

      console.log(response.data.data);

      if (paymentMethod === "VnPay") {
        const paymentUrl = response.data.data.paymentUrl;
        window.open(paymentUrl, "_blank");
      }
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  const formatDate = (date) => {
    const parsedDate = dayjs(date);

    const formattedDate = parsedDate.format("DD/MM/YYYY");
    return formattedDate;
  };

  console.log(selectedVoucher);
  const now = new Date();
  // Lọc danh sách voucher
  const validVouchers = voucher.filter((v) => new Date(v.startDate) <= now);

  return (
    <div className="flex items-center justify-center min-h-screen from-teal-100 bg-[#f0f0f0]">
      {cartItems.length === 0 ? (
        <div>
          <img src={notfound}></img>
          <p>Không tìm thấy sản phẩm</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl py-8 mx-auto bg-white rounded-lg shadow-xl">
          <div>
            <div>
              <div className="max-w-2xl space-y-6">
                <div className="px-[30px] py-[10px] ">
                  <div className="flex items-center">
                    <FaLocationDot />
                    <p className="ml-2">Địa chỉ nhận hàng</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      {displayAddress && (
                        <p>{`${displayAddress.name}, ${displayAddress.street}, ${displayAddress.ward}, ${displayAddress.district}, ${displayAddress.province}`}</p>
                      )}
                    </div>
                    {displayAddress && (
                      <button
                        className="text-[#4080ee]"
                        onClick={() => setIsChangeAddress(true)}
                      >
                        Thay đổi
                      </button>
                    )}
                  </div>
                </div>
                {cartItems.map((item) => (
                  <div
                    className=" px-[30px] py-[10px] flex  border-solid border-b"
                    key={item.productId}
                  >
                    <div className="w-1/6 ">
                      <img src={item.pictureUrls[0]} className="w-[75px] " />
                      <div
                        className="flex flex-wrap items-center justify-center text-[#999] pt-1 cursor-pointer"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <IoIosCloseCircle />
                        <p>Xóa</p>
                      </div>
                    </div>
                    <div className="block ml-[20px] w-full ">
                      <div className="flex flex-col">
                        <div>
                          <p className="float-left">{item.name}</p>
                          <p className="float-right  text-[16px] title-font text-[#d70018] font-bold">
                            {item.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <a
                            className="m-1 text-blue-500 cursor-pointer"
                            onClick={() => setSelectDiscount(true)}
                          >
                            {selectedVoucher ? (
                              <p>Đã chọn 1 mã khuyến mãi</p>
                            ) : (
                              <p>{validVouchers.length} khuyến mãi</p>
                            )}
                          </a>
                          {selectDiscount && (
                            <>
                              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                                <div className="relative w-full max-w-3xl mx-auto my-6 bg-white">
                                  <div className="py-2">
                                    <div className="shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)] ">
                                      <div className="flex justify-between py-[10px] px-[24px] items-center">
                                        <p className="items-center text-2xl font-semibold text-justify">
                                          Chọn voucher
                                        </p>
                                      </div>
                                    </div>
                                    <div className=" py-[10px] px-[24px]">
                                      {validVouchers.map((v) => (
                                        <div
                                          className="my-4 flex items-center border border-solid border-[#e8e8e8] boxshadow-voucher h-24"
                                          key={v.id}
                                        >
                                          <div className="flex items-center h-full px-6 mr-3 bg-red-600 bg-opacity-60">
                                            <img
                                              src={voucherimg}
                                              alt=""
                                              className="h-[56px] w-[56px] rounded-[50%]"
                                            />
                                          </div>
                                          <div className="flex flex-col flex-1 ">
                                            {/* <p>{v.name}</p> */}
                                            <p>
                                              Giảm {v.percent}% Tối đa{" "}
                                              <span className="text-[#4F89FC] font-bold">
                                                {" "}
                                                {v.maxDiscountAmount.toLocaleString(
                                                  "vi-VN",
                                                  {
                                                    style: "currency",
                                                    currency: "VND",
                                                  }
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              Đơn tối thiểu:{" "}
                                              <span className="text-[#4F89FC] font-bold">
                                                {v.minOrderValue.toLocaleString(
                                                  "vi-VN",
                                                  {
                                                    style: "currency",
                                                    currency: "VND",
                                                  }
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              Thời gian bắt đầu:{" "}
                                              {formatDate(v.startDate)}
                                            </p>
                                            <p>
                                              Hạn sử dụng:{" "}
                                              {formatDate(v.endDate)}
                                            </p>
                                          </div>
                                          <div className="p-3">
                                            <input
                                              type="radio"
                                              name="voucher"
                                              id={v.id}
                                              className="w-5 h-5"
                                              onChange={() =>
                                                handleSelectVoucher(v.code)
                                              }
                                              checked={
                                                selectedVoucher === v.code
                                              } // Check nếu mã voucher này đã được chọn
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="py-[10px] px-[24px] float-right">
                                      <button
                                        className="w-[140px] h-10 border-cancel mr-2 hover:bg-[#f8f8f8]"
                                        onClick={() => setSelectDiscount(false)}
                                      >
                                        Trở lại
                                      </button>
                                      <button
                                        type="button"
                                        className="w-[140px] h-10 bg-[#ee4d2d] text-white outline-none hover:bg-[#f05d40]"
                                        onClick={() => setSelectDiscount(false)}
                                      >
                                        Xác nhận
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                            </>
                          )}
                          <div className="flex ">
                            <div
                              className={`border-r border border-[#dfdfdf] border-solid bg-white w-[30px] h-[30px] cursor-pointer ${
                                item.quantity === 1 ? "cursor-not-allowed" : ""
                              }`}
                              onClick={() =>
                                item.quantity > 1 &&
                                decreaseQuantity(item.productId)
                              }
                            >
                              <i
                                className={`w-[12px] h-[2px] block my-3 mx-auto ${
                                  item.quantity === 1
                                    ? "bg-[#ccc]"
                                    : "bg-[#288ad6]"
                                }`}
                              ></i>
                            </div>
                            <input
                              type="text"
                              value={item.quantity}
                              className="text-[14px] text-[#333] h-[30px] w-[32px] text-center border border-solid border-[#dfdfdf]"
                            />
                            <div
                              className="border-r border border-[#dfdfdf] border-solid bg-white w-[30px] h-[30px] relative cursor-pointer"
                              onClick={() => increaseQuantity(item.productId)}
                            >
                              <i className="w-[12px] h-[2px]  block my-3 mx-auto bg-[#288ad6]"></i>
                              <i className="absolute w-[2px] h-[12px]  block mx-auto top-[8px] left-0 right-0 bg-[#288ad6]"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col ">
                <div className=" px-[30px] py-[10px] border-solid border-b">
                  <p className="mb-3 text-2xl">Chọn phương thức thanh toán</p>

                  {isOpen && (
                    <UserAddress
                      setIsOpen={setIsOpen}
                      address={selectedAddress}
                      onAddressUpdate={onAddressUpdate}
                    />
                  )}
                  {isChangeAddress && (
                    <div>
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-2/3 p-8 bg-white">
                          <div>
                            <p className="mb-3 text-xl">Địa chỉ của tôi</p>
                            <div>
                              {userAddress.map((a, index) => (
                                <div
                                  key={a.id}
                                  className="border-solid border-b-[1px] py-3 "
                                >
                                  <div className="flex">
                                    <div className="mr-3">
                                      <input
                                        type="radio"
                                        name="address"
                                        checked={a === displayAddress}
                                        onChange={() => handleAddressChange(a)}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex">
                                        <div className="flex flex-1">
                                          <p className="text-black">{`${a.name}`}</p>
                                          <span className="mx-2 border-solid border border-l-[0.5px]"></span>
                                          <p className="text-[#0000008a]">{`${a.contact}`}</p>
                                        </div>
                                        <div>
                                          <button
                                            className="text-[#08f] "
                                            onClick={() =>
                                              handleUpdateAddressClick(a)
                                            }
                                          >
                                            Cập nhật
                                          </button>
                                        </div>
                                      </div>
                                      <p className="text-[#0000008a]">{`${a.street}`}</p>
                                      <div className="flex items-center text-[#0000008a]">
                                        <p>{`${a.ward}`},&nbsp;</p>
                                        <p>{`${a.district}`},&nbsp;</p>
                                        <p>{`${a.province}`}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {index === userAddress.length - 1 && (
                                    <button
                                      className="flex items-center mt-3 border border-solid border-[#ee4d2d] text-[#ee4d2d] p-3"
                                      type="button"
                                      onClick={handleOpenAddressClick}
                                    >
                                      {" "}
                                      <FaPlus className="mr-2 text-gray-500" />
                                      Thêm Địa Chỉ Mới
                                    </button>
                                  )}
                                </div>
                              ))}

                              <div className="flex justify-end mt-5">
                                <button
                                  className="w-[140px] h-10 border-cancel mr-2 hover:bg-[#f8f8f8]"
                                  onClick={() => setIsChangeAddress(false)}
                                >
                                  Đóng
                                </button>
                                <button
                                  className="w-[140px] h-10 bg-[#ee4d2d] text-white outline-none hover:bg-[#f05d40]"
                                  type="button"
                                  onClick={handleUpdateClick}
                                >
                                  Xác nhận
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <label htmlFor="" className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      className="mr-2 "
                    />
                    <img src={cod} alt="" className="h-[32px] w-[32px] mr-2" />
                    Thanh toán khi nhận hàng
                  </label>
                  <label htmlFor="" className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="VnPay"
                      className="mr-2 "
                    />
                    <img
                      src={vnpay}
                      alt=""
                      className="h-[32px] w-[32px] mr-2"
                    />
                    Thanh toán VNPay
                  </label>
                </div>
                <div className=" px-[30px] py-[10px] flex flex-col">
                  <div className="">
                    <p className=" text-[16px] title-font font-normal float-left mt-4">
                      Tổng tiền
                    </p>
                    <span className="float-right  text-[16px] title-font  font-normal mt-4">
                      {totalAmount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="">
                    <p className=" text-[16px] title-font font-normal  float-left mt-4">
                      Tổng cộng Voucher giảm giá
                    </p>
                    <span className="float-right  text-[16px] title-font  font-normal mt-4">
                      {discountAmount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-[16px] title-font text-[#d70018] float-left mt-4">
                      Tổng thanh toán
                    </p>
                    <span className="float-right  text-[16px] title-font text-[#d70018] font-bold mt-4">
                      {totalAfterDiscount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="px-[30px] py-[10px] block text-white text-center h-[50px] mt-3 mx-auto w-1/2 rounded cursor-pointer bg-[#f79429]"
                onClick={handleOrder}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
