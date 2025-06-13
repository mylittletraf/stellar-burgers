import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  getConstructorState,
  resetModalData,
  setRequest
} from '../../slices/constructorSlice/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { getUserState } from '../../slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { constructorItems, orderRequest, orderModalData } =
    useSelector(getConstructorState);

  const { isAuthenticated } = useSelector(getUserState);

  let orderArray: TConstructorIngredient['_id'][] = [];

  const ingredients: TConstructorIngredient['_id'][] =
    constructorItems.ingredients.map((i) => i._id);

  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    orderArray = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (isAuthenticated && constructorItems.bun) {
      dispatch(setRequest(true));
      dispatch(createOrder(orderArray));
    } else if (isAuthenticated && !constructorItems.bun) {
      return;
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
