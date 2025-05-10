import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import "./ErrorPage.scss";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Default error message
  let errorMessage = "An unknown error occurred";

  // Handle different error types
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error?.statusText || error?.message) {
    errorMessage = error.statusText || error.message;
  }

  return (
    <div id="error-page" className='error-container'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <Link to="/" className='back-home-button'>Back to Home</Link>
    </div>
  );
};

export default ErrorPage;
