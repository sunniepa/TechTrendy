import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniCpuChip } from "react-icons/hi2";
import { BsGpuCard } from "react-icons/bs";
import { FaMemory, FaHdd, FaLaptop } from "react-icons/fa";
import bg from "../../assets/bg.png";
const Product = () => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    const getLaptops = async () => {
      try {
        const response =
          await axios.get(`https://localhost:5000/api/Laptops?pageNumber=1&pageSize=40
        `);
        if (Array.isArray(response.data.data)) {
          setLaptops(response.data.data);
          console.log("Là mảng", response.data.data);
        } else {
          console.error("Error: API did not return an array");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getLaptops();
  }, []);

  const bestlaptops = laptops
    .filter((laptop) => laptop.price > 30000000)
    .slice(0, 4);
  const gamingLaptops = laptops
    .filter((laptop) => laptop.graphicsCard.includes("RTX"))
    .slice(0, 4);

  const ultraBook = laptops
    .filter((laptop) => parseInt(laptop.weight) < 1.6)
    .slice(0, 4);
  return (
    <div>
      <div className="p-4 mx-auto lg:max-w-7xl mt-9 sm:max-w-full ">
        <div className="flex items-center mb-6 bg-white ">
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="bg-[#2b80dd] bg-no-repeat pl-5 pr-10 background-title"
          >
            <h2 className="text-[22px] font-semibold text-white leading-10 uppercase">
              Sản phẩm nổi bật
            </h2>
          </div>
        </div>

        <section className="text-gray-600 lg:col-span-4 md:col-span-2 body-font">
          <div className="">
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
              {bestlaptops.map((laptop) => (
                <Link
                  to={`/products/${laptop.id}`}
                  key={laptop.id}
                  className="group"
                >
                  <div className="h-full flex flex-col w-full p-4 overflow-hidden rounded  cursor-pointer bg-[white]  group">
                    <a className="relative block h-48 rounded w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                      <img
                        alt="ecommerce"
                        className="pt-2 group-hover:transition-hover-img transition-hover-product"
                        src={laptop.pictureUrls[0]}
                      />
                    </a>
                    <div className="mt-4">
                      <h2 className="mb-1 overflow-hidden text-lg font-medium text-[#333333] title-font md:whitespace-nowrap sm:whitespace-normal text-ellipsis group-hover:text-blue-400">
                        {laptop.name}
                      </h2>
                      <div className="bg-[#0088cc14] rounded text-[#8D8D99] text-xs py-1 px-2 mb-2 flex flex-wrap flex-col">
                        <div className="flex items-center pb-1 mr-2 ">
                          <HiMiniCpuChip className="mr-1 text-[16px] font-size flex-shrink-0" />
                          <span className="work-break">{laptop.cpu}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <BsGpuCard className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">
                            {laptop.graphicsCard}
                          </span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaMemory className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.ram}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaHdd className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.storage}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaLaptop className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.screen}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-auto text-[#d70018] font-bold">
                      {laptop.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="px-4 mx-auto mt-4 lg:max-w-7xl sm:max-w-full">
        <div className="flex items-center mb-6 bg-white">
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="bg-[#2b80dd] bg-no-repeat pl-5 pr-10 background-title"
          >
            <h2 className="text-[22px] font-semibold text-white leading-10 uppercase">
              Lap top mỏng nhẹ cao cấp
            </h2>
          </div>
        </div>
        <section className="text-gray-600 lg:col-span-4 md:col-span-2 body-font">
          <div className="">
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
              {ultraBook.map((laptop) => (
                <Link
                  to={`/products/${laptop.id}`}
                  key={laptop.id}
                  className="group"
                >
                  <div className="h-full flex flex-col w-full p-4 overflow-hidden rounded  cursor-pointer bg-[white]  group">
                    <a className="relative block h-48 rounded w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                      <img
                        alt="ecommerce"
                        className="pt-2 group-hover:transition-hover-img transition-hover-product"
                        src={laptop.pictureUrls[0]}
                      />
                    </a>
                    <div className="mt-4">
                      <h2 className="mb-1 overflow-hidden text-lg font-medium text-[#333333] title-font md:whitespace-nowrap sm:whitespace-normal text-ellipsis group-hover:text-blue-400">
                        {laptop.name}
                      </h2>
                      <div className="bg-[#0088cc14] rounded text-[#8D8D99] text-xs py-1 px-2 mb-2 flex flex-wrap flex-col">
                        <div className="flex items-center pb-1 mr-2 ">
                          <HiMiniCpuChip className="mr-1 text-[16px] font-size flex-shrink-0" />
                          <span className="work-break">{laptop.cpu}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <BsGpuCard className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">
                            {laptop.graphicsCard}
                          </span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaMemory className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.ram}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaHdd className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.storage}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaLaptop className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.screen}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-auto text-[#d70018] font-bold">
                      {laptop.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="px-4 mx-auto mt-4 lg:max-w-7xl sm:max-w-full">
        <div className="flex items-center mb-6 bg-white">
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="bg-[#2b80dd] bg-no-repeat pl-5 pr-10 background-title"
          >
            <h2 className="text-[22px] font-semibold text-white leading-10 uppercase">
              Lap top gaming đồ họa
            </h2>
          </div>
        </div>
        <section className="text-gray-600 lg:col-span-4 md:col-span-2 body-font">
          <div className="">
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
              {gamingLaptops.map((laptop) => (
                <Link
                  to={`/products/${laptop.id}`}
                  key={laptop.id}
                  className="group"
                >
                  <div className="h-full flex flex-col w-full p-4 overflow-hidden rounded  cursor-pointer bg-[white]  group">
                    <a className="relative block h-48 rounded w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                      <img
                        alt="ecommerce"
                        className="pt-2 group-hover:transition-hover-img transition-hover-product"
                        src={laptop.pictureUrls[0]}
                      />
                    </a>
                    <div className="mt-4">
                      <h2 className="mb-1 overflow-hidden text-lg font-medium text-[rgb(51,51,51)] title-font  md:whitespace-nowrap sm:whitespace-normal text-ellipsis group-hover:text-blue-400">
                        {laptop.name}
                      </h2>

                      <div className="bg-[#0088cc14] rounded text-[#8D8D99] text-xs py-1 px-2 mb-2 flex flex-wrap flex-col">
                        <div className="flex items-center pb-1 mr-2 ">
                          <HiMiniCpuChip className="mr-1 text-[16px] font-size flex-shrink-0" />
                          <span className="work-break">{laptop.cpu}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <BsGpuCard className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">
                            {laptop.graphicsCard}
                          </span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaMemory className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.ram}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaHdd className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.storage}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaLaptop className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.screen}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-auto text-[#d70018] font-bold">
                      {laptop.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
