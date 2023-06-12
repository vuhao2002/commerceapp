import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, listBrand } from "../Redux/Actions/brandActions";
import { AiOutlineDelete } from "react-icons/ai";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name Brand",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const dispatch = useDispatch();
  const [idBrand, setIdBrand] = useState();
  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;
  const deleteHandler = (id) => {
    dispatch(deleteBrand(id));
  };
  const data = [];
  if (brands && brands !== []) {
    for (let i = 0; i < brands.length; i++) {
      data.push({
        key: i + 1,
        title: brands[i].title,
        action: (
          <div className="d-flex align-items-center">
            <button
              className="btn ms-3 fs-3 text-danger"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setIdBrand(brands[i]._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ),
      });
    }
  }
  useEffect(() => {
    dispatch(listBrand());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Brand List</h3>
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
                DELETE BRAND
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this brand?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteHandler(idBrand)}
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

export default Brandlist;
