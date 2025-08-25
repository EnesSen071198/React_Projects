import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import validations from "./validations"; // validations.js dosyasını içe aktar

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "",
      hobbies: ""
    },
    validationSchema: validations, // validations şemasını burada kullan
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor='lastName'>Last Name</label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor='phone'>Phone</label>
      <input
        id='phone'
        name='phone'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.phone}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div>{formik.errors.phone}</div>
      ) : null}

      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}

      <label htmlFor='gender'>Gender</label>
      <select
        id='gender'
        name='gender'
        onChange={formik.handleChange}
        value={formik.values.gender}>
        <option value='' label='Select gender' />
        <option value='male' label='Male' />
        <option value='female' label='Female' />
        <option value='other' label='Other' />
      </select>
      {formik.touched.gender && formik.errors.gender ? (
        <div>{formik.errors.gender}</div>
      ) : null}

      <label htmlFor='hobbies'>Hobbies</label>
      <input
        id='hobbies'
        name='hobbies'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.hobbies}
      />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default SignUp;
