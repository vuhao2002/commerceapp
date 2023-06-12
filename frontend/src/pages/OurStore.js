import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Actions/productActions";
import { Link, useParams } from "react-router-dom";
const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const { page: pageNumber } = useParams();
  const productList = useSelector((state) => state.productList);
  const { page, pages, products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>
                    <Link to="/search/Watch">Watch</Link>
                  </li>
                  <li>
                    <Link to="/search/Apple">Apple</Link>
                  </li>
                  <li>
                    <Link to="/search/Laptop">Laptop</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    <Link to="/search/Acer">Acer</Link>
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    <Link to="/search/lenovo">lenovo</Link>
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    <Link to="/search/iphone">Iphone</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard grid={grid} pageNumber={pageNumber} />
              </div>
              {pages > 1 && (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {[
                      [...Array(pages).keys()].map((x) => (
                        <li
                          className={`page-item ${
                            x + 1 === page ? "active" : ""
                          }`}
                          key={x + 1}
                        >
                          <Link
                            className="page-link"
                            to={`/product/page/${x + 1}`}
                          >
                            {x + 1}
                          </Link>
                        </li>
                      )),
                    ]}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
