import { Rating, Button } from 'flowbite-react'
const RatingProduct = () => {
  return (
    <>
      <div className="px-5 pb-24 ml-auto mr-auto w-full mt-7">
        <p className="text-2xl mb-4 font-semibold">Đánh giá sản phẩm</p>
        <div className=" grid grid-cols-3 gap-4">
          <div className="flex flex-col justify-center items-center">
            <Rating className="">
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
            </Rating>
            <p className="ml-2  font-medium text-gray-500 dark:text-gray-400 py-2 text-3xl text-red-600">
              4.95/5
            </p>
            <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              1,745 đánh giá
            </p>
          </div>
          <div>
            <Rating.Advanced percentFilled={70} className="mb-2">
              5 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={17} className="mb-2">
              4 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={8} className="mb-2">
              3 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={4} className="mb-2">
              2 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
          </div>
          <div className="flex items-center flex-col justify-center">
            Bạn đã mua sản phẩm này chưa
            <Button className="mt-4">Gửi đánh giá</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RatingProduct
