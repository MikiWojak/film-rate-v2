import { useAsyncError } from 'react-router-dom';

import type { IErrorResponse } from '@/types/api/common';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const AsyncError = () => {
    const errorObj = useAsyncError() as FetchBaseQueryError;

    if (!errorObj?.data) {
        return <h1>Something went wrong...</h1>;
    }

    const { message, statusCode, error } = errorObj.data as IErrorResponse;

    return (
        <>
            <h1>{message}</h1>

            <pre>
                {statusCode} {error && ` - ${error}`}
            </pre>
        </>
    );
};

export default AsyncError;
