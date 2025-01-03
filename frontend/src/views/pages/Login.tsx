import { useFormik } from 'formik';
import { Link, Form, useSubmit, useNavigation } from 'react-router-dom';

import LoginSchema from '@/validators/auth/LoginSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { ILoginRequest, ILoginRequestFields } from '@/types/api/auth';

const Login = () => {
    const submit = useSubmit();
    const { state } = useNavigation();

    const initialValues: ILoginRequest = {
        email: '',
        password: ''
    };

    const formik = useFormik<ILoginRequest>({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: async values => {
            submit({ ...values }, { method: 'post' });
        }
    });

    const hasError = (field: ILoginRequestFields) =>
        formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (field: ILoginRequestFields): string =>
        formik.errors[field] || '';

    return (
        <>
            <h1 className="text-xl text-center font-medium">Login</h1>

            <div className="mb-7 text-center">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="text-violet-500 hover:underline hover:text-violet-600"
                >
                    Register here!
                </Link>
            </div>

            <Form method="post" onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ${
                        hasError('email') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('email') && (
                    <ValidationMessage message={getErrorMessage('email')} />
                )}

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ${
                        hasError('password') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('password') && (
                    <ValidationMessage message={getErrorMessage('password')} />
                )}

                <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="block w-full p-2 bg-violet-500 rounded-lg text-white font-medium hover:bg-violet-600 disabled:bg-violet-200 disabled:hover:bg-violet-200 sm:p-4"
                >
                    {state === 'submitting' ? 'Logging in...' : 'Login'}
                </button>
            </Form>
        </>
    );
};

export default Login;
