import { mixed, object, string } from 'yup';

const StoreSchema = object({
    title: string()
        .required('This field is required')
        .min(2, 'This field must have at least 2 characters')
        .max(255, 'This field must have max 255 characters'),
    poster: mixed()
        .required('This field is required')
        .test('fileFormat', 'Accepted file types: JPEG, PNG, GIF', value => {
            const file = value as File;

            if (file) {
                const supportedFormats = ['image/jpeg', 'image/png'];

                return supportedFormats.includes(file.type);
            }

            return true;
        })
        .test('fileSize', 'File size must be less than 5MB', value => {
            const file = value as File;

            if (file) {
                return file.size <= 5 * 1024 * 1024;
            }

            return true;
        }),
    description: string()
        .required('This field is required')
        .min(20, 'This field must have at least 20 characters')
        .max(5000, 'This field must have max 5000 characters'),
    // @TODO Extend
    releaseDate: string().required('This field is required')
});

export default StoreSchema;
