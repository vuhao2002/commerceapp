import React, { useState } from "react";
import { orderChangeStatus } from "../Redux/Actions/orderActions";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ChangeStatusOrder() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleEditStatusOrder = (id) => {
    if (status !== "") {
      dispatch(orderChangeStatus(id, status));
      navigate("/admin/enquiries");
    }
  };
  return (
    <div>
      <h5 className="mb-4">Change Status Order</h5>
      <select
        className="form-select w-25"
        aria-label="Default select example"
        onChange={handleChange}
        value={status}
      >
        <option defaultValue></option>
        <option value="Not Processed">Not Processed</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Processing">Processing</option>
        <option value="Dispatched">Dispatched</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Delivered">Delivered</option>
      </select>

      <button
        type="button"
        className="btn btn-success mt-2 p-2"
        onClick={() => handleEditStatusOrder(id)}
      >
        Submit
      </button>
    </div>
  );
}

export default ChangeStatusOrder;
