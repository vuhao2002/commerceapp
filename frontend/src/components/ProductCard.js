import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import Loading from "../LoadingError/Loading";
import Massage from "../LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Actions/productActions";
const ProductCard = (props) => {
  const { grid, keyword, pageNumber } = props;
  console.log(keyword, pageNumber);
  let location = useLocation();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {loading ? (
        <div className="mb-5 w-100%">
          <Loading />
        </div>
      ) : error ? (
        <Massage variant="alert-danger">{error}</Massage>
      ) : (
        products.map((product) => (
          <div key={product._id} className={`gr-${grid}`}>
            <Link
              to={`/product/${product._id}`}
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent">
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                {product.images.map((image, index) => {
                  if (index < 2)
                    return (
                      <img
                        key={index}
                        src={image.url}
                        className="img-fluid"
                        alt="product image"
                      />
                    );
                })}
              </div>
              <div className="product-details">
                <h6 className="brand">{product.brand}</h6>
                <h5 className="product-title">{product.title}</h5>
                {Number(product.totalRating) > 0 ? (
                  <ReactStars
                    count={5}
                    size={24}
                    value={Math.round(product.totalRating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                ) : (
                  <p style={{ height: "36px", margin: "0" }}></p>
                )}
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                >
                  {product.description}
                </p>
                <p className="price">{product.price} đ</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}

      {/* <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
              ? "/product/:id"
              : ":id"
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={watch} className="img-fluid" alt="product image" />
            <img src={watch2} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={10}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div> */}
    </>
  );
};

export default ProductCard;
