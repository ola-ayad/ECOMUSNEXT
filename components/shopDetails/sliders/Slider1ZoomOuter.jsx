"use client";
import Drift from "drift-zoom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slider1ZoomOuter({
  currentColor = "Beige",
  handleColor = () => {},
  firstImage,
  images
}) {
  // const images = [
  //   {
  //     id: 1,
  //     src: firstImage || "/images/shop/products/p-d1.png",
  //     alt: "",
  //     width: 770,
  //     height: 1075,
  //     dataValue: "beige",
  //   },
  //   {
  //     id: 2,
  //     src: "/images/shop/products/hmgoepprod.jpg",
  //     alt: "",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "beige",
  //   },
  //   {
  //     id: 3,
  //     src: "/images/shop/products/hmgoepprod2.jpg",
  //     alt: "img-compare",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "beige",
  //   },
  //   {
  //     id: 4,
  //     src: "/images/shop/products/hmgoepprod3.jpg",
  //     alt: "img-compare",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "beige",
  //   },
  //   {
  //     id: 5,
  //     src: "/images/shop/products/hmgoepprod4.jpg",
  //     alt: "img-compare",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "beige",
  //   },
  //   {
  //     id: 6,
  //     src: "/images/shop/products/hmgoepprod5.jpg",
  //     alt: "img-compare",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "beige",
  //   },
  //   {
  //     id: 7,
  //     src: "/images/shop/products/hmgoepprod6.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "black",
  //   },
  //   {
  //     id: 8,
  //     src: "/images/shop/products/hmgoepprod7.jpg",
  //     alt: "",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "black",
  //   },
  //   {
  //     id: 9,
  //     src: "/images/shop/products/hmgoepprod8.jpg",
  //     alt: "",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "black",
  //   },
  //   {
  //     id: 10,
  //     src: "/images/shop/products/hmgoepprod9.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "black",
  //   },
  //   {
  //     id: 11,
  //     src: "/images/shop/products/hmgoepprod10.jpg",
  //     alt: "",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "blue",
  //   },
  //   {
  //     id: 12,
  //     src: "/images/shop/products/hmgoepprod11.jpg",
  //     alt: "",
  //     width: 713,
  //     height: 1070,
  //     dataValue: "blue",
  //   },
  //   {
  //     id: 13,
  //     src: "/images/shop/products/hmgoepprod12.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "blue",
  //   },
  //   {
  //     id: 14,
  //     src: "/images/shop/products/hmgoepprod13.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "blue",
  //   },
  //   {
  //     id: 15,
  //     src: "/images/shop/products/hmgoepprod14.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "white",
  //   },
  //   {
  //     id: 16,
  //     src: "/images/shop/products/hmgoepprod15.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "white",
  //   },
  //   {
  //     id: 17,
  //     src: "/images/shop/products/hmgoepprod16.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "white",
  //   },
  //   {
  //     id: 18,
  //     src: "/images/shop/products/hmgoepprod17.jpg",
  //     alt: "",
  //     width: 768,
  //     height: 1152,
  //     dataValue: "white",
  //   },
  // ];

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  // useEffect(() => {
  //   const slideIndex =
  //     images.filter(
  //       (elm) => elm.dataValue.toLowerCase() == currentColor.toLowerCase()
  //     )[0]?.id - 1;
  //   swiperRef.current.slideTo(slideIndex);
  // }, [currentColor]);
  useEffect(() => {
    // Function to initialize Drift
    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <Swiper
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        className="tf-product-media-thumbs other-image-zoom"
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        breakpoints={{
          0: {
            direction: "horizontal",
          },
          1150: {
            direction: "vertical",
          },
        }}
      >
        {images?.map((slide, index) => (
          <SwiperSlide key={index} className="stagger-item">
            <div className="item">
              <Image
                className="lazyload"
                data-src={slide.path}
                alt={""}
                src={slide.path} // Optional fallback for non-lazy loading
                width='770'
                height='1075'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Gallery>
        <Swiper
          dir="ltr"
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="tf-product-media-main"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          // onSlideChange={(swiper) => {
          //   handleColor(images[swiper.activeIndex].dataValue);
          // }}
        >
          {images?.map((slide, index) => (
            <SwiperSlide key={index}>
              <Item
                original={slide.path}
                thumbnail={slide.path}
                width='770'
                height='1075'
              >
                {({ ref, open }) => (
                  <a
                    className="item"
                    data-pswp-width='770'
                    data-pswp-height='1075'
                    onClick={open}
                  >
                    <Image
                      className="tf-image-zoom lazyload"
                      data-zoom={slide.path}
                      data-src={slide.path}
                      ref={ref}
                      alt="image"
                      width='770'
                      height='1075'
                      src={slide.path} // Optional fallback for non-lazy loading
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>{" "}
      </Gallery>
    </>
  );
}
