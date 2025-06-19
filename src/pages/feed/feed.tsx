import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders, getFeedState } from '../../slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedOrders());
  }, []);
  const { feedData } = useSelector(getFeedState);
  const orders = feedData.orders;

  const handleGetFeeds = () => {
    dispatch(getFeedOrders());
  };

  if (!orders?.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
