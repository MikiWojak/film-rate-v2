import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StatusCodes as HTTP } from 'http-status-codes';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Formik, Form, FormikHelpers, Field } from 'formik';

import { useRateFilmMutation } from '@/redux/film/filmApiSlice';

import type {
    IBaseFilm,
    IFilm2User,
    IRateFilmBody,
    IRateFilmRequest
} from '@/types/api/film';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type Props = {
    film: IBaseFilm | null;
    onClose: () => void;
};

// @TODO Remove rate
const RateModal = ({ film, onClose }: Props) => {
    const navigate = useNavigate();
    const [rateFilm, { isLoading }] = useRateFilmMutation();

    if (!film) {
        return (
            <div className="flex justify-center items-center fixed top-0 z-10 w-screen h-screen p-4 bg-black/20">
                <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl w-full sm:max-w-100">
                    <button onClick={onClose}>
                        <XMarkIcon className="size-4" />
                    </button>
                    <div>Cannot load modal!</div>
                </div>
            </div>
        );
    }

    const film2User: IFilm2User | undefined = film?.film2Users?.[0];
    const rate = film2User?.rate ?? null;

    const initialValues: IRateFilmBody = {
        rate: rate ?? ''
    };

    const handleSubmit = async (
        values: IRateFilmBody,
        { resetForm }: FormikHelpers<IRateFilmBody>
    ) => {
        try {
            const payload: IRateFilmRequest = {
                id: film.id,
                body: values
            };

            await rateFilm(payload).unwrap();

            toast.success('Film rated');

            resetForm();

            onClose();
        } catch (error) {
            const fetchError = error as FetchBaseQueryError;

            if (fetchError?.status === HTTP.UNAUTHORIZED) {
                toast.error('You must login first!');

                navigate('/login');

                return;
            }

            toast.error('Error while rating the film');
        }
    };

    const { title } = film;

    return (
        <div className="flex justify-center items-center fixed top-0 z-10 w-screen h-screen p-4 bg-black/20">
            <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl w-full sm:max-w-100">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <XMarkIcon className="size-4" />
                    </button>
                </div>

                <div>
                    <h2 className="font-medium text-center md:text-2xl">
                        Rate film
                    </h2>
                    <h1 className="text-2xl font-bold text-center md:text-3xl">
                        {title}
                    </h1>
                </div>

                {/*// @TODO Validation schema (or not)*/}
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className="flex flex-col gap-4">
                        <Field
                            as="select"
                            id="rate"
                            name="rate"
                            className="block w-full p-2 rounded-lg outline-2 bg-white border-2 border-slate-400 focus:outline-black sm:p-4"
                        >
                            <option value="" disabled>
                                -- Rate film --
                            </option>
                            <option value={10}>(10) Masterpiece</option>
                            <option value={9}>(9) Great</option>
                            <option value={8}>(8) Very Good</option>
                            <option value={7}>(7) Good</option>
                            <option value={6}>(6) Fine</option>
                            <option value={5}>(5) Average</option>
                            <option value={4}>(4) Bad</option>
                            <option value={3}>(3) Very Bad</option>
                            <option value={2}>(2) Horrible</option>
                            <option value={1}>(1) Appalling</option>
                        </Field>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="block w-full p-2 bg-violet-500 rounded-lg text-white font-medium hover:bg-violet-600 disabled:bg-violet-200 disabled:hover:bg-violet-200 sm:p-4"
                        >
                            {isLoading ? 'Processing...' : 'Rate'}
                        </button>

                        {/*// @TODO What about disabled?*/}
                        {rate && (
                            <button className="block w-full p-2 bg-red-500 rounded-lg text-white font-medium hover:bg-red-600 disabled:bg-red-200 disabled:hover:bg-red-200 sm:p-4">
                                Remove rate
                            </button>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default RateModal;
