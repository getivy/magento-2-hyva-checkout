import React, { useCallback, useEffect, useState } from 'react';

import { PAYMENT_METHOD_FORM } from '../../../../config';
import { paymentMethodShape } from '../../../../utils/payment';
import useIvyPayment from '../hooks/useIvyPayment';
import useIvyPaymentAppContext from '../hooks/useIvyPaymentAppContext';
import useIvyPaymentCartContext from '../hooks/useIvyPaymentCartContext';
import useIvyPaymentFormikContext from '../hooks/useIvyPaymentFormikContext';
import RadioInput from '../../../../components/common/Form/RadioInput';
import RootElement from '../../../../utils/rootElement';
import { __ } from '../../../../i18n';
import useCheckoutFormContext from '../../../../hook/useCheckoutFormContext';

function IvyPaymentRenderer({ method, selected }) {
  const ivyPaymentLogoUrl = `${RootElement.getFilePath()}/Esparksinc_IvyPayment/images/ivylogo.svg`;
  const { registerPaymentAction } = useCheckoutFormContext();
  const methodCode = method.code;
  const { paymentSubmitHandler } = useIvyPayment();
  const { setPageLoader } = useIvyPaymentAppContext();
  const { setFieldValue } = useIvyPaymentFormikContext();
  const { isVirtualCart, setPaymentMethod, hasCartShippingAddress } =
    useIvyPaymentCartContext();
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(methodCode === selected.code);
  }, [methodCode, selected]);
  const isPaymentAvailable = !isVirtualCart && hasCartShippingAddress;

  const paymentSelectionHandler = useCallback(async () => {
    setPageLoader(true);
    setFieldValue(`${PAYMENT_METHOD_FORM}.code`, methodCode);
    await setPaymentMethod(methodCode);
    setPageLoader(false);
  }, [methodCode, setPageLoader, setPaymentMethod, setFieldValue]);

  useEffect(() => {
    registerPaymentAction('ivy', paymentSubmitHandler);
  }, [registerPaymentAction, paymentSubmitHandler]);

  const radioLabel = (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={`paymentMethod_${methodCode}`}
      className="inline-block pl-2 cursor-pointer"
    >
      <img src={ivyPaymentLogoUrl} alt={__('Amazon Pay')} />
    </label>
  );

  return (
    <RadioInput
      label={radioLabel}
      value={method.code}
      name="paymentMethod"
      checked={isSelected}
      disabled={!isPaymentAvailable}
      onChange={paymentSelectionHandler}
    />
  );
}

IvyPaymentRenderer.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
};
export default IvyPaymentRenderer;
