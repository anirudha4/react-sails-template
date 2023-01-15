import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login, Register } from './pages/Auth';
import { Transactions } from './pages/Dashboard';
import Layout from './shared/components/Layout';
import Routing from './shared/components/Routing';

// import store
import { store } from './store';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Routing />}>
        <Route index element={<Transactions />} />
        <Route path='auth' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

// wrapper component for application
function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
export default AppWrapper;