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
const Search = () => {
  const { keyword } = useParams();
  const { page: pageNumber } = useParams();
  const [grid, setGrid] = useState(4);
  const productList = useSelector((state) => state.productList);
  const { page, pages } = productList;
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Search Product" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="products-list pb-5">
              <div className="d-flex justify-content-center gap-10 flex-wrap">
                <ProductCard
                  keyword={keyword}
                  pageNumber={pageNumber}
                  grid={grid}
                />
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
                            to={
                              keyword !== ""
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/product/page/${x + 1}`
                            }
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

export default Search;
