import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoryCreate } from "../Redux/Actions/categoryActions";

const Addcategory = () => {
  const [title, setTitle] = useState("");
  const createCategory = useSelector((state) => state.createCategory);
  const { success, error } = createCategory;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(categoryCreate(title));
  };

  useEffect(() => {
    if (success) {
      toast.success("Category Added Successfully !");
      setTimeout(() => {
        navigate("/admin/list-category");
      }, 3000);
    }
    if (error) {
      toast.error("Something Went Wrong !");
    }
  }, [success, error]);
  return (
    <div className="mb-4 title">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Category"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Category
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

export default Addcategory;
