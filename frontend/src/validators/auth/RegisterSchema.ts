import { object, ref, string } from 'yup';

const RegisterSchema = object({
    username: string()
        .required('This field is required')
        .min(2, 'This field must have at least 2 characters')
        .max(64, 'This field must have max 64 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'This field has forbidden characters'),
    email: string()
        .required('This field is required')
        .email('Wrong email format'),
    password: string()
        .required('This field is required')
        .min(8, 'This field must have at least 8 characters'),
    confirmPassword: string()
        .required('This field is required')
        .oneOf([ref('password')], 'Passwords must match')
});

export default RegisterSchema;
