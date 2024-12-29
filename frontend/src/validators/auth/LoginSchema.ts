import { object, string } from 'yup';

const LoginSchema = object({
    email: string()
        .required('This field is required')
        .email('Wrong email format'),
    password: string().required('This field is required')
});

export default LoginSchema;
