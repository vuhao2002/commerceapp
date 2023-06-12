import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, listCategory } from "../Redux/Actions/categoryActions";
import { AiOutlineDelete } from "react-icons/ai";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name Category",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const dispatch = useDispatch();
  const [idCategory, setIdCategory] = useState();
  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };
  const data = [];
  if (categorys && categorys !== []) {
    for (let i = 0; i < categorys.length; i++) {
      data.push({
        key: i + 1,
        title: categorys[i].title,
        action: (
          <div className="d-flex align-items-center">
            <button
              className="btn ms-3 fs-3 text-danger"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setIdCategory(categorys[i]._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ),
      });
    }
  }
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
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
                DELETE CATEGORY
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this category?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteHandler(idCategory)}
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

export default Categorylist;
