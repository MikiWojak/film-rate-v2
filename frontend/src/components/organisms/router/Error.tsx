import { useRouteError } from 'react-router-dom';

import type { IErrorResponse } from '@/types/api/common';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const Error = () => {
    const errorObj = useRouteError() as FetchBaseQueryError;

    const data = errorObj.data as IErrorResponse;

    const pageTitle = data?.message
        ? `Error: ${data.message}`
        : 'Something went wrong...';

    return (
        <>
            <h1>{pageTitle}</h1>

            <pre>
                {data?.statusCode} {data?.error && ` - ${data.error}`}
            </pre>
        </>
    );
};

export default Error;
