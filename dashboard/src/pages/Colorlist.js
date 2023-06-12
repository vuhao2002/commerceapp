import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { deleteColor, listColor } from "../Redux/Actions/colorActions";
import { useDispatch, useSelector } from "react-redux";
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
    title: "Color",
    dataIndex: "color",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const dispatch = useDispatch();
  const [idColor, setIdColor] = useState();
  const colorList = useSelector((state) => state.colorList);
  const { colors } = colorList;
  const deleteHandler = (id) => {
    dispatch(deleteColor(id));
  };
  const data = [];
  if (colors && colors !== []) {
    for (let i = 0; i < colors.length; i++) {
      data.push({
        key: i + 1,
        title: colors[i].title,
        color: (
          <div
            className={`p-2 border border-dark`}
            style={{ backgroundColor: colors[i].title }}
          ></div>
        ),
        action: (
          <div className="d-flex align-items-center">
            <button
              className="btn ms-3 fs-3 text-danger"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setIdColor(colors[i]._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ),
      });
    }
  }
  useEffect(() => {
    dispatch(listColor());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Color List</h3>
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
                DELETE COLOR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this color?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteHandler(idColor)}
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

export default Colorlist;
