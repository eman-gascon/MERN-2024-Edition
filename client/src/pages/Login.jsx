import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {msg:''};
  if(data.password.length < 3){
    errors.msg = 'Password too short';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  };
};


const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className = 'form'>
        <Logo />
        <h4>Login</h4>
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type = 'email' name = 'email' defaultValue='john@gmail.com' />
        <FormRow type = 'password' name = 'password' defaultValue='secret123' />
        <button type = 'submit' className = 'btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button>
        <button type = 'button' className = 'btn btn-block'>
          Explore App
        </button>
        <p>
          Not a member Yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
};

export default Login