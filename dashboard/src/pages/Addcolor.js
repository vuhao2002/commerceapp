import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colorCreate } from "../Redux/Actions/colorActions";

const Addcolor = () => {
  const [title, setTitle] = useState("");
  const createColor = useSelector((state) => state.createColor);
  const { success, error } = createColor;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(colorCreate(title));
  };

  useEffect(() => {
    if (success) {
      toast.success("Color Added Successfully !");
      setTimeout(() => {
        navigate("/admin/list-color");
      }, 3000);
    }
    if (error) {
      toast.error("Something Went Wrong !");
    }
  }, [success, error]);
  return (
    <div className="mb-4 title">
      <h3>Add Color</h3>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="color"
          label="Enter Color"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Color
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

export default Addcolor;
