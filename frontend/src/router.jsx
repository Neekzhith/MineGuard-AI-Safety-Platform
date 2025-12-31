import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DeviceDashboard from './pages/DeviceDashboard';
import Chatbot from './pages/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'chatbot',
        element: (
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        ),
      },
      {
        path: 'devices',
        element: (
          <ProtectedRoute>
            <DeviceDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;




