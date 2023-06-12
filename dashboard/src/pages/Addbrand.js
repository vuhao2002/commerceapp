import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { brandCreate } from "../Redux/Actions/brandActions";
import { useNavigate } from "react-router-dom";

const Addbrand = () => {
  const [title, setTitle] = useState("");
  const createBrand = useSelector((state) => state.createBrand);
  const { success, error } = createBrand;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(brandCreate(title));
  };
  useEffect(() => {
    if (success) {
      toast.success("Brand Added Successfully !");
      setTimeout(() => {
        navigate("/admin/list-brand");
      }, 3000);
    }
    if (error) {
      toast.error("Something Went Wrong !");
    }
  }, [success, error]);

  return (
    <div className="mb-4 title">
      <h3>Add brand</h3>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          label="Enter brand"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add brand
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={250}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default Addbrand;
