import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserState } from '../../slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const { userData } = useSelector(getUserState);
  return <AppHeaderUI userName={userData?.name ?? ''} />;
};
