import React from 'react';

export default function ErrorPage ({ statusCode, err }) {
    return (
        <div>
            <h1>Error {statusCode}</h1>
            <p>Oops! Something went wrong.</p>
            <p>{err.message}</p>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode, err };
};
