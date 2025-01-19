import { useFormik } from 'formik';
import { Form, useSubmit, useNavigation } from 'react-router-dom';

import StoreSchema from '@/validators/film/StoreSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type {
    IStoreFilmRequest,
    IStoreFilmRequestFields
} from '@/types/api/film';

const Add = () => {
    const submit = useSubmit();
    const { state } = useNavigation();

    const initialValues: IStoreFilmRequest = {
        title: '',
        poster: '',
        description: '',
        releaseDate: ''
    };

    const formik = useFormik<IStoreFilmRequest>({
        initialValues,
        validationSchema: StoreSchema,
        onSubmit: async values => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    formData.append(key, value);
                }
            });

            submit(formData, {
                method: 'post',
                encType: 'multipart/form-data'
            });
        }
    });

    const hasError = (field: IStoreFilmRequestFields) =>
        formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (field: IStoreFilmRequestFields): string =>
        formik.errors[field] || '';

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center font-medium">Add Film</h1>

            <Form method="post" onSubmit={formik.handleSubmit}>
                <label htmlFor="title" className="text-sm">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ${
                        hasError('title') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('title') && (
                    <ValidationMessage message={getErrorMessage('title')} />
                )}

                <label htmlFor="image" className="text-sm">
                    Poster
                </label>
                <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/gif"
                    className={`block w-full ${
                        !hasError('poster') ? 'mb-7' : ''
                    }`}
                    onChange={async e => {
                        console.log(e.target.files);

                        await formik.setFieldValue(
                            'poster',
                            e.target.files?.[0] || ''
                        );
                    }}
                />
                {hasError('poster') && (
                    <ValidationMessage message={getErrorMessage('poster')} />
                )}

                <label htmlFor="description" className="text-sm">
                    Description
                </label>
                <input
                    type="textarea"
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 focus:outline-black sm:p-4 ${
                        hasError('description') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('description') && (
                    <ValidationMessage
                        message={getErrorMessage('description')}
                    />
                )}

                <label htmlFor="releaseDate" className="text-sm">
                    Release Date
                </label>
                <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={formik.values.releaseDate}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 sm:p-4 ${
                        hasError('releaseDate') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('releaseDate') && (
                    <ValidationMessage
                        message={getErrorMessage('releaseDate')}
                    />
                )}

                <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="block w-full p-2 bg-violet-500 rounded-lg text-white font-medium hover:bg-violet-600 disabled:bg-violet-200 disabled:hover:bg-violet-200 sm:p-4"
                >
                    {state === 'submitting' ? 'Processing...' : 'Add'}
                </button>
            </Form>
        </div>
    );
};

export default Add;
