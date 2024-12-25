"use client";
import { useState ,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
import { useNewRemoveFromWishlist } from "@/api/wishlist/newRemoveFromWishlist";
import { useCheckProductInWishlist } from "@/api/wishlist/checkProduct";
import { useAddToWishlist } from "@/api/wishlist/addToWishlist";
export const ProductCardWishlist = ({ product, productId }) => {
  const [currentImage, setCurrentImage] = useState(product.thumbnail_image);
  const { setQuickViewItem } = useContextElement();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const removeFromWishlist = useNewRemoveFromWishlist();
  const checkWishlist = useCheckProductInWishlist();
  const addToWishlist = useAddToWishlist();
  const id = localStorage.getItem("id");
  const {
    setQuickAddItem,
    // addToWishlist,
    // isAddedtoWishlist,
    // removeFromWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  const handleRemove = () => {
    removeFromWishlist.mutate(
      { productId: productId, userId: id },
      {
        onSuccess: (data) => {
          console.log("Wishlist data:", data);
        },
        onError: (error) => {
          console.error("Error:", error.message);
        },
      }
    );
  };

  const handleAddToWishlist = () => {
    addToWishlist.mutate(
      { productId: productId, userId: id },
      {
        onSuccess: (data) => {
          console.log("Wishlist data:", data);
        },
        onError: (error) => {
          console.error("Error:", error.message);
        },
      }
    );
  };
  useEffect(() => {
    checkWishlist.mutate(
      { productId: productId, userId: id },
      {
        onSuccess: (data) => {
          setIsInWishlist(data?.is_in_wishlist);
          console.log("Wishlist data:", data?.is_in_wishlist);
        },
        onError: (error) => {
          console.error("Error:", error.message);
        },
      }
    );
  }, [productId, removeFromWishlist.isSuccess]);
  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.slug}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product?.thumbnail_image}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={
              product.imgHoverSrc
                ? product.imgHoverSrc
                : product.thumbnail_image
            }
            src={
              product.imgHoverSrc
                ? product.imgHoverSrc
                : product.thumbnail_image
            }
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn type-wishlist">
          <a
            onClick={() => handleRemove()}
            className="box-icon bg_white wishlist"
          >
            <span className="tooltip">Remove Wishlist</span>
            <span className="icon icon-delete" />
          </a>
        </div>

        <div className="list-product-btn">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(productId)}
            data-bs-toggle="modal"
            className="box-icon bg_white quick-add tf-btn-loading"
          >
            <span className="icon icon-bag" />
            <span className="tooltip">Quick Add</span>
          </a>
          <a
            onClick={() => {
              isInWishlist ? handleRemove() : handleAddToWishlist();
            }}
            className="box-icon bg_white wishlist btn-icon-action"
          >
            <span
              className={`${isInWishlist ? "icon-heart-full" : "icon-heart"}`}
            />
            <span className="tooltip">
              {isInWishlist ? "Already Wishlisted" : "Add to Wishlist"}
            </span>
            <span className="icon icon-delete" />
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon bg_white compare btn-icon-action"
          >
            <span
              className={`icon icon-compare ${
                isAddedtoCompareItem(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {" "}
              {isAddedtoCompareItem(product.id)
                ? "Already Compared"
                : "Add to Compare"}
            </span>
            <span className="icon icon-check" />
          </a>
          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
        {product.sizes && (
          <div className="size-list">
            {product.sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug}`} className="title link">
          {product.name}
        </Link>
        {/* <span className="price">${product.price.toFixed(2)}</span> */}
        {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color) => (
              <li
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                } `}
                key={color.name}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt="image-product"
                  width={720}
                  height={1005}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
