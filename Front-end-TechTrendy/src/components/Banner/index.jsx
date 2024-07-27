import { Carousel, Flowbite } from "flowbite-react";
const customTheme = {
  carousel: {
    indicators: {
      active: {
        off: "bg-[#76c3ff] hover:bg-blue-950",
        on: "bg-blue-950",
      },
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 group-hover:bg-black/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    },
  },
};

const Banner = () => {
  return (
    <div className="grid gap-2 p-4 mx-auto lg:grid-cols-3 md:grid-cols-1 lg:max-w-7xl sm:max-w-full bg-bl">
      <div className="w-full h-56 col-span-2 sm:h-64 xl:h-full 2xl:h-96">
        <Flowbite theme={{ theme: customTheme }}>
          <Carousel slideInterval={5000}>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/6/638453158333588575_F-H1_800x300.png"
              alt="..."
              className="h-full"
            />
            <img
              src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/13/638458875805036210_F-H1_800x300.png"
              alt="..."
              className="h-full"
            />
            <img
              src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/8/638455360890412193_F-H1_800x300@2x.jpg"
              alt="..."
              className="h-full"
            />
            <img
              src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/29/638448424956202070_F-H1_800x300.png"
              alt="..."
              className="h-full"
            />
            <img
              src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086704799381_F-H1_800x300.png"
              alt="..."
              className="h-full"
            />
          </Carousel>
        </Flowbite>
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div className="overflow-hidden rounded">
          <img
            className="w-full"
            src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086704799381_F-H1_800x300.png"
            alt="..."
          />
        </div>
        <div className="overflow-hidden rounded">
          <img
            className="w-full "
            src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/29/638448424956202070_F-H1_800x300.png"
            alt="..."
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
