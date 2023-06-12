import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProduct } from "../Redux/Actions/productActions";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "img",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [idProduct, setIdProduct] = useState();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const data = [];
  if (products && products !== []) {
    for (let i = 0; i < products.length; i++) {
      data.push({
        key: i + 1,
        img: (
          <img
            src={products[i]?.images[0]?.url}
            alt="img"
            height={100}
            width={100}
          />
        ),
        title: products[i].title,
        amount: products[i].price,
        quantity: products[i].quantity,
        action: (
          <div className="d-flex align-items-center">
            <Link
              className="fs-3 text-danger"
              to={`/admin/edit-product/${products[i]._id}`}
            >
              <BiEdit />
            </Link>
            <button
              className="btn ms-3 fs-3 text-danger"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setIdProduct(products[i]._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ),
      });
    }
  }
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Productlist</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      {/* Model */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                DELETE PRODUCT
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this product?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteProductHandler(idProduct)}
              >
                Delete
              </button>
              <button type="button" className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
