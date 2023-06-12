import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";

import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
  productCheckUser,
} from "../Redux/Actions/productActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { addToCart } from "../Redux/Actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/productConstants";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;
  const productCheckUserBuy = useSelector((state) => state.productCheckUserBuy);
  const { success: successCheckBuy } = productCheckUserBuy;
  const [imgZoom, setImgZoom] = useState("");
  const [qty, setQty] = useState(1);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const st = product?.ratings?.length;
  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setStar(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    dispatch(productCheckUser(id));
  }, [dispatch, id, successCreateReview]);

  const [orderedProduct, setorderedProduct] = useState(false);
  // const props = {
  //   width: 594,
  //   height: 600,
  //   zoomWidth: 600,
  //   img: imgZoom
  //     ? imgZoom
  //     : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  // };
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const handleImageClick = (url) => {
    setImgZoom(url);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(addToCart(id, qty));
    } else {
      navigate("/login");
    }
  };
  const buyHandler = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(addToCart(id, qty));
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const submitHandReview = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, star, comment));
  };
  return (
    <>
      {loading ? (
        <div className="mt-3 mb-3">
          <Loading />
        </div>
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <Meta title={"Product Name"} />
          <BreadCrumb title="Product Name" />
          <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-6">
                <div className="main-product-image">
                  <div>
                    {/* <ReactImageZoom {...props} /> */}
                    <img
                      src={imgZoom || product.images?.[0].url}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                <div className="other-product-images d-flex flex-wrap gap-15">
                  {product?.images?.map((image, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleImageClick(image.url)}
                      >
                        <img src={image.url} className="img-fluid" alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-6">
                <div className="main-product-details">
                  <div className="border-bottom">
                    <h3 className="title">{product.title}</h3>
                  </div>
                  <div className="border-bottom py-3">
                    <p className="price">{product.price} đ</p>
                    {Number(product?.totalRating) > 0 ? (
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={Math.round(product?.totalRating)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0 t-review">( {st} Reviews )</p>
                      </div>
                    ) : (
                      <></>
                    )}
                    <a className="review-btn" href="#review">
                      Write a Review
                    </a>
                  </div>
                  <div className=" py-3">
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Type :</h3>
                      <p className="product-data">{product.category}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Brand :</h3>
                      <p className="product-data">{product.brand}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Category :</h3>
                      <p className="product-data">{product.category}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Tags :</h3>
                      <p className="product-data">{product.category}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Availablity :</h3>
                      {product.quantity > 0 ? (
                        <p className="product-data">{product.quantity}</p>
                      ) : (
                        <p className="product-data">unavailable</p>
                      )}
                    </div>
                    <div className="d-flex gap-10 mt-2 mb-3">
                      <h3 className="product-heading">Color :</h3>
                      <div
                        className="p-2 border border-secondary"
                        style={{
                          backgroundColor: product.color,
                          width: "24px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                      <h3 className="product-heading">Quantity :</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={product.quantity}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQty(e.target.value)}
                          value={qty}
                        />
                      </div>
                      <div className="d-flex align-items-center gap-30 ms-5">
                        <button
                          className="button border-0"
                          // data-bs-toggle="modal"
                          // data-bs-target="#staticBackdrop"
                          type="button"
                          onClick={(e) => addToCartHandler(e)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="button signup"
                          onClick={(e) => {
                            buyHandler(e);
                          }}
                        >
                          Buy It Now
                        </button>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                      <div>
                        <a href="">
                          <TbGitCompare className="fs-5 me-2" /> Add to Compare
                        </a>
                      </div>
                      <div>
                        <a href="">
                          <AiOutlineHeart className="fs-5 me-2" /> Add to
                          Wishlist
                        </a>
                      </div>
                    </div>
                    <div className="d-flex gap-10 flex-column  my-3">
                      <h3 className="product-heading">Shipping & Returns :</h3>
                      <p className="product-data">
                        Free shipping and returns available on all orders!{" "}
                        <br /> We ship all US domestic orders within
                        <b>5-10 business days!</b>
                      </p>
                    </div>
                    {/* <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h4>Description</h4>
                <div className="bg-white p-3">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="reviews-wrapper home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 id="review">Reviews</h3>
                <div className="review-inner-wrapper">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4 className="mb-2">Customer Reviews</h4>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={Math.round(product?.totalRating)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0">Based on {st ? st : 0} Reviews</p>
                      </div>
                    </div>
                    {successCheckBuy && (
                      <div>
                        <a
                          className="text-dark text-decoration-underline"
                          href=""
                        >
                          Write a Review
                        </a>
                      </div>
                    )}
                  </div>
                  {successCheckBuy && (
                    <div className="review-form py-4">
                      <h4>Write a Review</h4>
                      <form
                        action=""
                        className="d-flex flex-column gap-15"
                        onSubmit={submitHandReview}
                      >
                        <div>
                          <ReactStars
                            count={5}
                            size={24}
                            edit={true}
                            activeColor="#ffd700"
                            onChange={(e) => setStar(e)}
                          />
                        </div>
                        <div>
                          <textarea
                            name=""
                            id=""
                            className="w-100 form-control"
                            cols="30"
                            rows="4"
                            placeholder="Comments"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            className="button border-0"
                            disabled={loadingCreateReview}
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {product?.ratings ? (
                    <>
                      {product?.ratings.map((review) => {
                        return (
                          <div className="reviews mt-4" key={review._id}>
                            <div className="review">
                              <div className="d-flex gap-10 align-items-center">
                                <h6 className="mb-0">
                                  {review.postedBy.firstName}
                                </h6>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={review.star}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                              <p className="mt-3" style={{ fontSize: "16px" }}>
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Container>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            {/* <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                <div className="modal-header py-0 border-0">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body py-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 w-50">
                      <img
                        src={watch}
                        className="img-fluid"
                        alt="product imgae"
                      />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 w-50">
                      <h6 className="mb-3">Apple Watch</h6>
                      <p className="mb-1">Quantity: 100</p>
                      <p className="mb-1">Color: 100</p>
                      <p className="mb-1">Size: 100</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 py-0 justify-content-center gap-30">
                  <button
                    type="button"
                    className="button"
                    data-bs-dismiss="modal"
                  >
                    View My Cart
                  </button>
                  <button type="button" className="button signup">
                    Checkout
                  </button>
                </div>
                <div className="d-flex justify-content-center py-3">
                  <Link
                    className="text-dark"
                    to="/product"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Continue To Shopping
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
