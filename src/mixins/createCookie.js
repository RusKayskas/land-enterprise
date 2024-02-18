export function createdCookieWizard(currency, productId, coupon) {
  const cookie = {
    type: 'proxy',
    currency: currency,
    billingCycle: 'monthly',
    productId: productId,
    coupon: coupon,
  };
  const cookieString = JSON.stringify(cookie);
  document.cookie = `newWizard=${cookieString}; path=/; domain=.ddos-guard.net`;
}
