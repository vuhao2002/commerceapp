import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { listOrders } from "../Redux/Actions/orderActions";
import {
  countOrdersDelivered,
  dashboardChart,
  sumAmountOrderDelivered,
} from "../Redux/Actions/dashboardActions";
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
const data = [
  { type: "Jan", sales: 0 },
  { type: "Feb", sales: 0 },
  { type: "Mar", sales: 0 },
  { type: "Apr", sales: 0 },
  { type: "May", sales: 0 },
  { type: "Jun", sales: 0 },
  { type: "July", sales: 0 },
  { type: "Aug", sales: 0 },
  { type: "Sept", sales: 0 },
  { type: "Oct", sales: 0 },
  { type: "Nov", sales: 0 },
  { type: "Dec", sales: 0 },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const dashboard = useSelector((state) => state.dashboard);
  const { loading, charts, countOrders, sumAmount } = dashboard;
  const data1 = [];
  if (orders && orders !== []) {
    for (let i = 0; i < orders.length; i++) {
      data1.push({
        key: i + 1,
        name: orders[i].orderby.firstName,
        product: orders[i].products.map((i) => {
          return <p key={i._id}>{i.product.title}</p>;
        }),
        amount: orders[i].paymentIntent.amount,
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
    dispatch(dashboardChart());
    dispatch(countOrdersDelivered());
    dispatch(sumAmountOrderDelivered());
  }, [dispatch]);
  if (charts && charts.length > 0) {
    charts.forEach(({ _id, totalQuantity }) => {
      const month = _id.month;
      data[month - 1].sales = totalQuantity;
    });
  }
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Months",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">{sumAmount && sumAmount} đ</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total orders </p>
            <h4 className="mb-0 sub-title">{orders && orders.length}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total number of orders delivered</p>
            <h4 className="mb-0 sub-title">{countOrders && countOrders}</h4>
          </div>
        </div>
      </div>
      <div className="mt-4 title">
        <h3 className="mb-5">Income Statics</h3>
        {loading || (
          <div>
            <Column {...config} />
          </div>
        )}
      </div>
      <div className="mt-4 title">
        <h3 className="mb-5">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
