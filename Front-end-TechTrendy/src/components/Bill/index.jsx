import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const Bill = () => {
  const click = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thanh toán thành công",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  click();
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-white sm:bg-gray-200">
      <button
        className="flex items-center px-4 py-2 text-xl text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={returnHome}
      >
        Trở về trang chủ
      </button>
    </div>
  );
};

export default Bill;
