import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />
      <Route path='/*' element={<NotFound404 />} />
      <Route
        path='/feed/:number'
        element={
          <Modal
            title={''}
            onClose={() => {
              history.back();
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />{' '}
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title={''}
            onClose={() => {
              history.back();
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />{' '}
      <Route
        path='/profile/orders/:number'
        element={
          <Modal
            title={''}
            onClose={() => {
              history.back();
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
