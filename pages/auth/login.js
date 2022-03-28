import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/users';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const validationSchema = yup.object({
    email: yup.string().required('Please enter your email address.'),
    password: yup.string().required('Please enter your password.'),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <form>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(login(values));
          router.push('/auth/profile');
        }}
      >
        {(props) => {
          return (
            <>
              <h3>Login</h3>
              <input
                type="text"
                placeholder="Email address"
                onChange={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
              />
              {props.touched && props.errors.email && (
                <span style={{ color: 'red' }}>{props.errors.email}</span>
              )}
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
              />
              {props.touched && props.errors.password && (
                <span style={{ color: 'red' }}>{props.errors.password}</span>
              )}
              <br />
              <button type="submit" onClick={props.handleSubmit}>
                Login
              </button>
              <Link href="/admin">Admin</Link>
            </>
          );
        }}
      </Formik>
    </form>
  );
};

export default Login;
