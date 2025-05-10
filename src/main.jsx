import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./components/UserContext.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import AuthForm from "./components/AuthForm.jsx";
import BookingComponent from "./components/BookingComponent.jsx";
import AllRooms from "./components/AllRooms.jsx";
import OccupiedDatesDisplay from "./components/OccupiedDatesDisplay.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <BookingComponent />
        ),
      },
      {
        path: "/auth",
        element: (
          <GuestRoute>
            <AuthForm></AuthForm>
          </GuestRoute>
        ),
      },
      {
        path: "/all-rooms",
        element: (
          <AllRooms />
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <OccupiedDatesDisplay />
        ),
      },
      {
        path: "*",
        element: (
          <NotFoundPage />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
