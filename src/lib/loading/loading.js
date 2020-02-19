import React from 'react';

export default function MyLoadingComponent({ error, pastDelay }) {
    if (error) {
        console.log(error);
        return <div>Error!</div>;
    } else if (pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}