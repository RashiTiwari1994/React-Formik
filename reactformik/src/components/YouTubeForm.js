import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comment: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
const onSubmit = (values, onSubmitProps) => {
  console.log("Form Values", values);
  console.log("Submit props", onSubmitProps);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required Field"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required field"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }

  return error;
};
const YouTubeForm = () => {
  //console.log("Formik value:", formik.values);
  //   console.log("Formik error:", formik.errors);
  //console.log("Formik visited:", formik.touched);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnChange={false}
      // validateOnBlur={false}  we can use these two according to our requirement
    >
      <div className="w-full h-screen flex items-center justify-center">
        <Form className="flex flex-col justify-center items-baseline h-fit  mt-[40rem] w-[35%] border border-blue-500 p-8 gap-4">
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              name="name"
              id="name"
              className="border border-gray-300 w-full"
            />

            <ErrorMessage name="name" component={TextError} />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 w-full"
            />
            <ErrorMessage name="email" component={TextError} />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="channel">Channel</label>
            <Field
              type="text"
              name="channel"
              id="channel"
              className="border border-gray-300 w-full"
            />
            <ErrorMessage name="channel" component={TextError} />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="comment">Comments</label>
            <Field
              as="textarea"
              type="text"
              name="comment"
              id="comment"
              validate={validateComments}
              className="border border-gray-300 w-full"
            />
            <ErrorMessage name="comment" component={TextError} />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="address">Address</label>
            <Field
              type="text"
              name="address"
              id="address"
              validate={validateComments}
              className="border border-gray-300 w-full"
            />
            <ErrorMessage name="address" component={TextError} />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="facebook">Facebook profile</label>
            <Field
              type="text"
              id="facebook"
              name="social.facebook"
              validate={validateComments}
              className="border border-gray-300 w-full"
            />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="twitter">Twitter profile</label>
            <Field
              type="text"
              id="twitter"
              name="social.twitter"
              validate={validateComments}
              className="border border-gray-300 w-full"
            />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="primaryPh">Primary phone Number</label>
            <Field
              type="text"
              id="primaryPh"
              name="phoneNumbers[0]"
              className="border border-gray-300 w-full"
            />
          </div>
          <div className="form-control mb-5 w-full text-left">
            <label htmlFor="secondaryPh">Secondary phone number</label>
            <Field
              type="text"
              id="secondaryPh"
              name="phoneNumbers[1]"
              className="border border-gray-300 w-full"
            />
          </div>

          <div className="form-control mb-5 w-full text-left">
            <label>List of Phone Numbers</label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                //console.log('Field Array props:',fieldArrayProps)
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phNumbers } = values;

                return (
                  <div>
                    {phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`} />
                        {index > 0 && (
                          <button
                            type="button"
                            className="border border-gray-300 px-2 py-2"
                            onClick={() => remove(index)}
                          >
                            -
                          </button>
                        )}
                        <button
                          type="button"
                          className="border border-gray-300 px-2 py-2"
                          onClick={() => push("")}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <button type="submit" className="bg-blue-300 px-8 py-2 rounded-md">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default YouTubeForm;

// 1. pass the initial values for form fields
//2. add the onChange and value props for each of the field
//3. Yup is used for validation schema the first step is
// (i) define the object validationSchema
//(ii) pass this object validationSchema into useFormik hook

//  onChange={formik.handleChange}
// value={formik.values.email}
// onBlur={formik.handleBlur}  is equal to  {...formik.getFieldProps("name/email/channel")}
//the getFieldProps method with which we could get rid of some boilerplate although that is decent
//we still have to manually pass each input the getField helper method to save us even more time
// Formik actually provide few components that implicitly use react context  to make our life easier
// There are four components :
// 1. Formik 2. Form  3. Field 4. ErrorMessage

//1. Formik component is the replacement of useFormik hook

// Step -1 : import Formik instead of useFormik
//Step -2 : Remove useFormik call
//Step -3 : Wrap entire form with Formik component
//Step -4 : pass in different props to Formik Component

//2. import Form and replace form with Form and remove onSubmit with Form

//3. import Field and replace input with Field and remove getFieldProps method
//4. import ErrorMessage and replace error field with ErrorMessage Component and pass  name props

//Note : instead of as we can also use component
