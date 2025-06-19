import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersState,
  getOrders
} from '../../slices/ordersSlice/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getOrdersState);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
