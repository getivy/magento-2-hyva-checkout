import { useCallback } from 'react';

import { __ } from '@hyva/react-checkout/i18n';
import createIvyCheckoutSession from '../api/cart/createIvyCheckoutSession';
import useIvyPaymentAppContext from './useIvyPaymentAppContext';

export default function useIvyPayment() {
  const { setPageLoader, appDispatch, setErrorMessage } =
    useIvyPaymentAppContext();

  const paymentSubmitHandler = useCallback(async () => {
    try {
      setPageLoader(true);
      const response = await createIvyCheckoutSession(appDispatch, false);
      if (response.redirectUrl !== '') {
        if (Object.prototype.hasOwnProperty.call(window, 'startIvyCheckout')) {
          window.startIvyCheckout(response.redirectUrl, 'popup');
        } else {
          setErrorMessage(__('Not loading CDN for IvyCheckout'));
        }
      } else {
        setErrorMessage(__(response.errorMessage));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoader(false);
    }
  }, [setPageLoader, appDispatch, setErrorMessage]);

  return {
    paymentSubmitHandler,
  };
}
