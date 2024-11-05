export const feature = `
import counterModule from '@sample-stack/counter-module-browser';
import accountModule from '@sample-stack/account-module-browser';
import paymentModule from '@sample-stack/payment-module-browser';

const features = new Feature(FeatureWithRouterFactory, counterModule, accountModule, paymentModule);
`;
