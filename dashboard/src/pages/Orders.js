import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { listOrders } from "../Redux/Actions/orderActions";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "OrderStatus",
    dataIndex: "orderStatus",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const data = [];
  if (orders && orders !== []) {
    for (let i = 0; i < orders.length; i++) {
      data.push({
        key: i + 1,
        name: orders[i].orderby.firstName,
        product: orders[i].products.map((i) => {
          return <p key={i._id}>{i.product.title}</p>;
        }),
        amount: `${orders[i].paymentIntent.amount} đ`,
        orderStatus: orders[i].orderStatus,
        date: new Date(orders[i].createdAt).toLocaleString(),
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/changeStatusOrder/${orders[i]._id}`}
            >
              <BiEdit />
            </Link>
          </>
        ),
      });
    }
  }
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
