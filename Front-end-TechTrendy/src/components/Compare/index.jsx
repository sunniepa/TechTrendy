import { useLocation } from "react-router-dom";
import add from "../../assets/add.png";

const Compare = (props) => {
  const location = useLocation();
  const products = location.state.products;

  console.log(products);
  return (
    <div className="p-4 pt-24 mx-auto lg:max-w-7xl sm:max-w-full">
      <div>
        <ul className="grid grid-cols-4 boxshadow-compare">
          <li className="p-2 bg-white">
            <p className="font-normal">So sánh sản phẩm</p>
            {products.map((product, index) => (
              <div key={product.id}>
                <p>{product.name}</p>
                {index !== products.length - 1 && <span>&</span>}
              </div>
            ))}
          </li>
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-white border-l border-[#e6e6e6] border-r justify-center p-3"
            >
              <img src={product.pictureUrls[0]} alt="" />
              <p className="mt-2 font-normal">{product.name}</p>
              <p className=" text-[#4F89FC] font-bold">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </li>
          ))}
          {[...Array(3 - products.length)].map((_, index) => (
            <li
              key={index}
              className="flex flex-col items-center w-full pt-3 bg-white justify-center width-compare border-l border-[#e6e6e6] border-r"
            >
              <img src={add} alt="" className="w-16 h-16" />
              <span className="m-2 text-xs font-normal text-center work-break">
                Thêm sản phẩm
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-20">
        <div className="mb-3 uppercase">Thông tin phần cứng</div>

        <div className="bg-white border-compare">
          <div className="block">
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Công Nghệ CPU
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.cpu}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Dung lượng RAM
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.ram}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Ổ cứng
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.storage}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Trọng lượng sản phẩm
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.weight}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Chất liệu
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.design}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Màn hình
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.screen}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Card đồ họa
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.graphicsCard}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Hệ điều hành
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.os}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Cổng kết nối
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.ports.map((port, index) => (
                    <li key={index}>{port}</li>
                  ))}
                </aside>
              ))}
            </div>
            <div className="flex">
              <aside className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                Thời điểm ra mắt
              </aside>
              {products.map((product) => (
                <aside
                  className="w-1/4 py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal"
                  key={product.id}
                >
                  {product.releaseDate}
                </aside>
              ))}
            </div>
          </div>
          {/* <div>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Công Nghệ CPU
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Dung lượng RAM
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Ổ cứng
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Trọng lượng sản phẩm
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Chất liệu
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Màn hình
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Card đồ họa
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Hệ điều hành
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Cổng kết nối
            </p>
            <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
              Thời điểm ra mắt
            </p>
          </div>
          {products.map((product) => (
            <div key={product.id}>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.cpu}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.ram}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.storage}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.weight}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.design}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.screen}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.graphicsCard}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.os}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.ports}
              </p>
              <p className="py-[10px] px-3 border-b border-[#e0e0e0] border-r font-normal">
                {product.releaseDate}
              </p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default Compare;
