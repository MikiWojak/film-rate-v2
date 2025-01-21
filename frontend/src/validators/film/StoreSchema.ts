import { mixed, object, string } from 'yup';

const StoreSchema = object({
    title: string()
        .required('This field is required')
        .min(2, 'This field must have at least 2 characters')
        .max(255, 'This field must have max 255 characters'),
    poster: mixed()
        .required('This field is required')
        .test('fileFormat', 'Accepted file types: JPEG, PNG', value => {
            if (!value) return false;

            const file = value as File;
            const supportedFormats = ['image/jpeg', 'image/png'];

            return supportedFormats.includes(file.type);
        })
        .test('fileSize', 'File size must be less than 5MB', value => {
            if (!value) return false;

            const file = value as File;

            return file.size <= 5 * 1024 * 1024;
        }),
    description: string()
        .required('This field is required')
        .min(20, 'This field must have at least 20 characters')
        .max(5000, 'This field must have max 5000 characters'),
    releaseDate: string().required('This field is required')
});

export default StoreSchema;
