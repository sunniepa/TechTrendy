import { FaPlus } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
import { BsGpuCard } from "react-icons/bs";
import { FaMemory, FaHdd, FaLaptop } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts, setSearchTerm } from "../../searchSlice";
const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);
  const allProducts = useSelector((state) => state.search.products);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchProducts(searchTerm));
    }
  }, [searchTerm, dispatch]);

  console.log(allProducts);

  return (
    <>
      <div className="p-4 pt-24 mx-auto lg:max-w-7xl sm:max-w-full">
        <section className="text-gray-600 body-font">
          <div className="">
            <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
              {allProducts.map((laptop) => (
                <Link to={`/products/${laptop.id}`} key={laptop.id}>
                  <div className="flex flex-col w-full h-full p-4 overflow-hidden bg-white rounded shadow-md cursor-pointer hover:boxshadow-dark">
                    <a className="relative block h-48 rounded w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 ">
                      <img
                        alt="ecommerce"
                        className=""
                        src={laptop.pictureUrls[0]}
                      />
                    </a>
                    <div className="mt-4">
                      <h2 className="mb-1 overflow-hidden text-lg font-medium text-[#333333 title-font whitespace-nowrap text-ellipsis">
                        {laptop.name}
                      </h2>
                      <div className="bg-[#0088cc14] rounded text-[#8D8D99] text-xs py-1 px-2 mb-2 flex flex-wrap ">
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
                    <p className="mt-auto text-[#4F89FC] font-bold">
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
    </>
  );
};

export default Search;
