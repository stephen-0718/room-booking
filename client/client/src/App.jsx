import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AddHotel from "./pages/AddHotel";
import AddRoom from "./pages/AddRoom";
import AdminBookings from "./pages/AdminBookings";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Hotels />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/add-hotel"
          element={
            <AdminProtectedRoute>
              <AddHotel />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/add-room"
          element={
            <AdminProtectedRoute>
              <AddRoom />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminProtectedRoute>
              <AdminBookings />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;