import { useFormik } from 'formik';
import { Link, Form, useSubmit, useNavigation } from 'react-router-dom';

import RegisterSchema from '@/validators/auth/RegisterSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type {
    IRegisterRequest,
    IRegisterRequestFields
} from '@/types/api/auth';

const Register = () => {
    const submit = useSubmit();
    const { state } = useNavigation();

    const initialValues: IRegisterRequest = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const formik = useFormik<IRegisterRequest>({
        initialValues,
        validationSchema: RegisterSchema,
        onSubmit: async values => {
            submit({ ...values }, { method: 'post' });
        }
    });

    const hasError = (field: IRegisterRequestFields) =>
        formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (field: IRegisterRequestFields): string =>
        formik.errors[field] || '';

    return (
        <>
            <h1 className="text-xl text-center font-medium">Register</h1>

            <div className="mb-7 text-center">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="text-violet-500 hover:underline hover:text-violet-600"
                >
                    Login here!
                </Link>
            </div>

            <Form method="post" onSubmit={formik.handleSubmit}>
                <input
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ' +
                        (hasError('username') ? '!border-red-600' : 'mb-7')
                    }
                />
                {hasError('username') && (
                    <ValidationMessage message={getErrorMessage('username')} />
                )}

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ' +
                        (hasError('email') ? '!border-red-600' : 'mb-7')
                    }
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
                    className={
                        'block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ' +
                        (hasError('password') ? '!border-red-600' : 'mb-7')
                    }
                />
                {hasError('password') && (
                    <ValidationMessage message={getErrorMessage('password')} />
                )}

                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ' +
                        (hasError('confirmPassword')
                            ? '!border-red-600'
                            : 'mb-7')
                    }
                />
                {hasError('confirmPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('confirmPassword')}
                    />
                )}

                <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="block w-full p-2 bg-violet-500 rounded-lg text-white font-medium hover:bg-violet-600 disabled:bg-violet-200 disabled:hover:bg-violet-200 sm:p-4"
                >
                    {state === 'submitting' ? 'Registering...' : 'Registering'}
                </button>
            </Form>
        </>
    );
};

export default Register;
