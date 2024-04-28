import React from "react";
import Carousel from "react-multi-carousel";
// static
import UserDatas from "@/static/Users";
// component
import SectionTitle from "./SectionTitle";

interface IUsercardProps {
  userData: IstaticUser;
}
interface IdotProps {
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  index?: number;
}

const UserCard: React.FC<IUsercardProps> = ({ userData }) => (
  <div
    className={`
    w-[320px] xl:w-[360px] h-[490px] box-border mx-0 xl:mx-10
    flex flex-col items-center justify-start p-6
    border border-solid border-[#121212] rounded-md shadow-2xl
    `}
  >
    <img
      src={
        new URL(`../../assets/imgs/${userData.imgUrl}`, import.meta.url).href
      }
      className="w-[65px] h-[80px]"
      alt="user"
    />
    <h5 className="m-0 text-4xl font-medium">{userData.title}</h5>
    <p className="m-0 text-2xl text-[#7D7D7D]">{userData.subTitle}</p>
    <div className="border border-solid border-[#8C8C8C] w-full my-6"></div>

    <span className="text-2xl leading-9 font-light">{userData.context}</span>
  </div>
);

const Users: React.FC = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    ipadMini: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    ipadAir: {
      breakpoint: { max: 1100, min: 820 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    ipad_mini_Landscape: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    ipad_mini_Portrait: {
      breakpoint: { max: 820, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    phone: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // slidesToSlide: 1, // optional, default to 1.
    },
  };
  const CustomDot: React.FC<IdotProps> = ({ onClick, active }) => {
    return (
      <div
        className={`w-4 h-4 rounded-full ${
          active ? "bg-[#FF4D4F]" : "bg-[#D9D9D9]"
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) {
            onClick(e);
          }
        }}
      />
    );
  };
  return (
    <section className="mt-20 2xl:flex 2xl:flex-col 2xl:items-center">
      <SectionTitle className=" mb-16">User Evaluation</SectionTitle>
      {/* <div className="flex flex-col items-center gap-5">
        {UserDatas.map((userData: IstaticUser) => (
          <UserCard key={userData.title} userData={userData} />
        ))}
      </div> */}
      <Carousel
        responsive={responsive}
        arrows={false}
        itemClass="flex justify-center"
        className="w-full 2xl:w-[80%] h-full"
        showDots
        dotListClass="flex lg:hidden gap-3 mt-5 md:mt-0"
        sliderClass="mb-10"
        customDot={<CustomDot />}
      >
        {UserDatas.map((userData: IstaticUser) => (
          <UserCard key={userData.title} userData={userData} />
        ))}
      </Carousel>
    </section>
  );
};

export default Users;
