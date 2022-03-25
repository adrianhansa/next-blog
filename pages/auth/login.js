import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';

const Login = () => {
  const validationSchema = yup.object({
    email: yup.string().required('Please enter your email address.'),
    password: yup.string().required('Please enter your password.'),
  });
  return (
    <form>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(value);
        }}
      >
        {(props) => {
          return (
            <>
              <input type="text" placeholder="Email address" />
            </>
          );
        }}
      </Formik>
    </form>
  );
};

export default Login;
