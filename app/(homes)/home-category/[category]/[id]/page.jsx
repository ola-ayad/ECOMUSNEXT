"use client";
import { useGetLinkCategories } from "@/api/categories/getLinkCategories";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";

import Products from "@/components/homes/home-men/Products";
import Announcment from "@/components/homes/multi-brand/Announcment";
import Categories from "@/components/homes/multi-brand/Categories";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// export const metadata = {
//   title: "Home Men || Ecomus - Ultimate Nextjs Ecommerce Template",
//   description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
export default function page({ params }) {
  const { categories, subCategories, setCategoryId } = useContextElement();
  const [link, setLink] = useState(null);
  const [banner, setBanner] = useState("");
  const [categoryName, setCategoryName] = useState(null);
  const [foundCategory, setFoundCategory] = useState(null);
  const { data } = useGetLinkCategories(link);
  const { category, id } = params;
  useEffect(() => {
    const foundLink = categories?.data.find((item) => item.id == id)?.links
      .products;
    setLink(foundLink);
    const foundBanner = categories?.data.find((item) => item.id == id)?.banner;
    setBanner(foundBanner);
    const name = categories?.data.find((item) => item.id == id)?.name;
    const cat = categories?.data.find((item) => item.id == id);
    setFoundCategory(cat)
    setCategoryName(name);
    const catId = categories?.data.find((item) => item.id == id)?.id;
    setCategoryId(catId);
    console.log("catt", categories?.data, id, foundLink);
  }, [categories]);

  useEffect(() => {
    console.log("sub id", subCategories);
  }, [subCategories]);
  return (
    <>
      <Announcment />
      <Header7 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">{categoryName}</span>
            </div>
            {/* <ProductSinglePrevNext currentId={product?.slug} /> */}
          </div>
        </div>
      </div>
      <Categories category={foundCategory} subCategories={subCategories?.data} />
      {/* <Hero banner={banner} /> */}
      {/* <Countdown /> */}
      {/* <Collections /> */}
      {/* <Banner /> */}
      <Products products={data?.data} />
      {/* <CollectionBanner /> */}
      {/* <Features bgColor="" /> */}
      {/* <Blogs /> */}
      {/* <Marquee /> */}
      <Footer1 bgColor="background-gray" />
    </>
  );
}
