import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "Nguyễn Thanh Hùng Cường",
      position: "21120007",
      images: images.founder1,
    },
    {
      name: "Võ Trung Hoàng Hưng",
      position: "21120011",
      images: images.founder2,
    },
    {
      name: "Tạ Công Hoàng",
      position: "21120074",
      images: images.founder3,
    },
    {
      name: "Phan Lê Đắc Phú",
      position: "21120111",
      images: images.founder4,
    },
    {
      name: "Trần Trọng Nghĩa",
      position: "21120507",
      images: images.founder5,
    },
  ];

  // const factsArray = [
  //   {
  //     title: "10 million",
  //     info: "Articles have been public around the world (as of Sept. 30, 2021)",
  //   },
  //   {
  //     title: "100,000",
  //     info: "Registered users account (as of Sept. 30, 2021)",
  //   },
  //   {
  //     title: "220+",
  //     info: "Countries and regions have our presence (as of Sept. 30, 2021",
  //   },
  // ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_title}>
          <h2>👋 About Us.</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={500}
                  height={500}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h4>{el.name}</h4>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/*<div className={Style.aboutus_box_title}>*/}
        {/*  <h2>🚀 Fast Facts</h2>*/}
        {/*  <p>*/}
        {/*    We’re impartial and independent, and every day we create*/}
        {/*    distinctive, world-class programmes and content*/}
        {/*  </p>*/}
        {/*</div>*/}

        {/*<div className={Style.aboutus_box_facts}>*/}
        {/*  <div className={Style.aboutus_box_facts_box}>*/}
        {/*    {factsArray.map((el, i) => (*/}
        {/*      <div className={Style.aboutus_box_facts_box_info}>*/}
        {/*        <h3>{el.title}</h3>*/}
        {/*        <p>{el.info}</p>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;
