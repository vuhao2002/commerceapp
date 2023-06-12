import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../Redux/Actions/userActions";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const data = [];
  if (users && users !== []) {
    for (let i = 0; i < users.length; i++) {
      data.push({
        key: i + 1,
        name: `${users[i].firstName} ${users[i].lastName}`,
        email: users[i].email,
        role: users[i].role,
      });
    }
  }
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customers;
