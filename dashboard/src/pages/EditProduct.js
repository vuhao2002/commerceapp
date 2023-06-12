import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteImg,
  imgUpload,
  listProductDetails,
  productEdit,
} from "../Redux/Actions/productActions";
import { listBrand } from "../Redux/Actions/brandActions";
import { listColor } from "../Redux/Actions/colorActions";
import { listCategory } from "../Redux/Actions/categoryActions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  color: yup.string().required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});
const EditProduct = () => {
  const { id } = useParams();
  const uploadImg = useSelector((state) => state.uploadImg);
  const { images } = uploadImg;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const categoryList = useSelector((state) => state.categoryList);

  const { categorys } = categoryList;
  const colorList = useSelector((state) => state.colorList);
  const { colors } = colorList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listBrand());
    dispatch(listCategory());
    dispatch(listColor());
  }, []);
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(productEdit(id, values));
    },
  });
  const img = [];
  images.forEach((i) => {
    img.push({
      ...i,
    });
  });
  useEffect(() => {
    formik.values.images = img;
  }, [dispatch, images, img]);
  return (
    <div>
      <h3 className="mb-4 title">Edit Product</h3>
      <div>
        {loading ? (
          <div className="mt-3 mb-3">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onChange={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              value={formik.values.title || product?.title}
            />
            <div className=" alert-danger mb-3">
              {formik.touched.title && formik.errors.title}
            </div>
            <div className="mb-3">
              <ReactQuill
                theme="snow"
                name="description"
                onChange={formik.handleChange("description")}
                onBlr={formik.handleBlur("description")}
                value={formik.values.description || product?.description}
              />
              <div className=" alert-danger mb-3">
                {formik.touched.description && formik.errors.description}
              </div>
            </div>
            <CustomInput
              type="number"
              label="Enter Product Price"
              name="price"
              onChange={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              value={formik.values.price ? formik.values.price : product?.price}
            />
            <div className=" alert-danger mb-3">
              {formik.touched.price && formik.errors.price}
            </div>
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              value={formik.values.brand ? formik.values.brand : product?.brand}
              className="form-select py-3 mb-3"
            >
              <option value={product?.brand}>{product?.brand}</option>
              {brands &&
                brands.map((brand) => {
                  return (
                    <option value={brand.title} key={brand._id}>
                      {brand.title}
                    </option>
                  );
                })}
            </select>
            <div className=" alert-danger mb-3">
              {formik.touched.brand && formik.errors.brand}
            </div>
            <select
              name="category"
              onChange={formik.handleChange("category")}
              value={
                formik.values.category
                  ? formik.values.category
                  : product?.category
              }
              className="form-select py-3 mb-3"
            >
              <option value={product?.category}>{product?.category}</option>
              {categorys &&
                categorys.map((cotegory) => {
                  return (
                    <option value={cotegory.title} key={cotegory._id}>
                      {cotegory.title}
                    </option>
                  );
                })}
            </select>
            <div className=" alert-danger mb-3">
              {formik.touched.category && formik.errors.category}
            </div>
            <select
              name="color"
              onChange={formik.handleChange("color")}
              value={formik.values.color ? formik.values.color : product?.color}
              className="form-select py-3 mb-3"
            >
              <option
                value={product?.color}
                className={`m-2`}
                style={{ color: product?.color }}
              >
                {product?.color}
              </option>
              {colors &&
                colors.map((color) => {
                  return (
                    <option
                      value={color.title}
                      key={color._id}
                      className={`m-2`}
                      style={{ color: color.title }}
                    >
                      {color.title}
                    </option>
                  );
                })}
            </select>
            <div className=" alert-danger mb-3">
              {formik.touched.color && formik.errors.color}
            </div>
            <CustomInput
              type="number"
              label="Enter Product Quantity"
              name="quantity"
              onChange={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              value={formik.values.quantity || product?.quantity}
            />
            <div className=" alert-danger mb-3">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(imgUpload(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="mt-2 d-flex flex-wrap gap-3">
              {images &&
                images.map((image, j) => {
                  return (
                    <div className="mt-2 position-relative" key={j}>
                      <button
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                        onClick={() => dispatch(deleteImg(image.public_id))}
                        type="button"
                      ></button>
                      <img
                        src={image.url}
                        className="m-2"
                        alt=""
                        width={200}
                        height={200}
                      />
                    </div>
                  );
                })}
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Add product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
