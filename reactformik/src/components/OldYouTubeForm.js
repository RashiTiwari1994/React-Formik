import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  console.log("Form Values", values);
};

// const validate = (values) => {
//   let errors = {};
//   if (!values.name) {
//     errors.name = "Required";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   }
//   if (!values.channel) {
//     errors.channel = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }
//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string().required("Required field"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required field"),
});
const OldYouTubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate, instead we are using validation schema
  });

  //console.log("Formik value:", formik.values);
  //   console.log("Formik error:", formik.errors);
  console.log("Formik visited:", formik.touched);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-baseline h-fit mx-auto w-[25%] border border-blue-500 p-8 gap-4"
      >
        <div className="form-control mb-5">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            className="border border-gray-300 w-full"
          />

          {formik.touched.name && formik.errors.name ? (
            <div className="error text-red-800">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="border border-gray-300 w-full"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error text-red-800 ">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control mb-5">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            name="channel"
            id="channel"
            onChange={formik.handleChange}
            value={formik.values.channel}
            onBlur={formik.handleBlur}
            className="border border-gray-300 w-full"
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error text-red-800">{formik.errors.channel}</div>
          ) : null}
        </div>
        <button type="submit" className="bg-blue-300 px-8 py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OldYouTubeForm;

// 1. pass the initial values for form fields
//2. add the onChange and value props for each of the field
//3. Yup is used for validation schema the first step is
// (i) define the object validationSchema
//(ii) pass this object validationSchema into useFormik hook
