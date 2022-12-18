## Hyvä Themes - React Checkout Ivy Payment

Magento 2 Ivy Payment payment method renderers for [Hyvä React Checkout](https://github.com/hyva-themes/magento2-hyva-checkout)

**Note: This work is now officially moved to the repository [getivy/magento-2-hyva-react-checkout](https://github.com/getivy/magento-2-hyva-react-checkout)**

## Prerequisites

1. **[React Checkout](https://github.com/hyva-themes/magento2-react-checkout)** is installed and setup.
2. Ivy Payment for Magento 2 is installed and setup. `composer require getivy/magento-2`
3. Ivy Payment HyvaCompatibility for Magento 2 is installed and setup. `composer require getivy/magento-2-hyva-compatibility` **[Esparksinc IvyPaymentHyvaCompatibility](https://github.com/getivy/magento-2-hyva-express)**
4. Ivy Payment Method Graphql for Magento 2 is installed and setup. `composer require getivy/magento-2-graphql` **[Esparksinc_IvyPaymentGraphql](https://github.com/getivy/magento-2-graphql)**
## Installation steps

1. Go to your `package.json` of Hyvä React Checkout and add below configuration.

   File: `src/reactapp/package.json`
    ```
    "config": {
        "paymentMethodsRepo": {
          "IvyPayment": "git@github.com:getivy/magento-2-hyva-react-checkout.git"
        }
    },
    ```

2. Run `npm install`. This will do all necessary setup for you.
3. Run `npm run build` to build a new version of the build js file which will now include this payment renderer.

## More Reading

- If you have any doubts about the building the react app, then **[read more about it here](https://hyva-themes.github.io/magento2-react-checkout/build/)**.
- If you want to know more about how Hyvä Checkout helps you to integrate any payment methods, then **[read more about it here](https://hyva-themes.github.io/magento2-react-checkout/payment-integration/)**.
- The official documentation of **[Hyvä Checkout](https://hyva-themes.github.io/magento2-react-checkout)**
