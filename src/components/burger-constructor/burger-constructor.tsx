import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import {
  clearIngredients,
  selectConstructorBurger
} from '../../slices/constructorSlice';
import {
  placeNewOrder,
  getModalOrder,
  getOrderRequest,
  clearModalOrder
} from '../../slices/ordersSlice';
import { getIsAuthChecked, getUser } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorBurger);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getModalOrder);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!isAuthChecked || !user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(placeNewOrder(orderData)).finally(() =>
      dispatch(clearIngredients())
    );
  };

  const closeOrderModal = () => {
    dispatch(clearModalOrder());
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
