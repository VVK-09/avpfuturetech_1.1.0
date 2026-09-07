/**
 * AVP FutureTech — Cashfree Payment Gateway Service (Sandbox & Live)
 * Handles SDK initialization, order generation, checkout redirection, and payment verification.
 */

const CASHFREE_SDK_URL = 'https://sdk.cashfree.com/js/v3/cashfree.js';

let cashfreeInstance = null;

/**
 * Load Cashfree JS SDK v3 script dynamically
 */
export const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return resolve(null);
    }

    if (window.Cashfree) {
      return resolve(window.Cashfree);
    }

    const existingScript = document.getElementById('cashfree-sdk-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.Cashfree));
      existingScript.addEventListener('error', (err) => reject(err));
      return;
    }

    const script = document.createElement('script');
    script.id = 'cashfree-sdk-script';
    script.src = CASHFREE_SDK_URL;
    script.async = true;
    script.onload = () => {
      resolve(window.Cashfree);
    };
    script.onerror = (err) => {
      console.warn('[Cashfree SDK Load Notice] Failed to load remote SDK, using Sandbox simulator mode.');
      resolve(null);
    };

    document.head.appendChild(script);
  });
};

/**
 * Initialize Cashfree instance in 'sandbox' or 'production' mode
 * @param {'sandbox' | 'production'} mode
 */
export const initCashfree = async (mode = 'sandbox') => {
  try {
    const Cashfree = await loadCashfreeSDK();
    if (Cashfree) {
      cashfreeInstance = Cashfree({
        mode: mode === 'production' ? 'production' : 'sandbox'
      });
      return cashfreeInstance;
    }
    return null;
  } catch (err) {
    console.warn('[Cashfree Init Notice]:', err);
    return null;
  }
};

/**
 * Create Cashfree Order via Next.js Backend API
 */
export const createCashfreeOrder = async ({
  candidateId,
  name,
  email,
  phone,
  amount,
  domainId,
  domainName
}) => {
  try {
    const response = await fetch('/api/cashfree/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        candidateId,
        name,
        email,
        phone,
        amount,
        domainId,
        domainName
      })
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('[Cashfree Create Order Error]:', err);
    return {
      success: false,
      error: 'Network error connecting to payment server.'
    };
  }
};

/**
 * Verify Cashfree Order Status via Next.js Backend API
 */
export const verifyCashfreeOrder = async (orderId) => {
  try {
    const response = await fetch('/api/cashfree/verify-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('[Cashfree Verify Order Error]:', err);
    return {
      success: false,
      error: 'Network error verifying order status.'
    };
  }
};

/**
 * Launch Cashfree Checkout
 */
export const launchCashfreeCheckout = async (paymentSessionId, mode = 'sandbox') => {
  const cf = await initCashfree(mode);
  if (cf && paymentSessionId && !paymentSessionId.includes('sim_') && !paymentSessionId.includes('demo_')) {
    try {
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: '_modal' // Opens seamless Cashfree popup modal
      };
      return await cf.checkout(checkoutOptions);
    } catch (err) {
      console.warn('[Cashfree Checkout Modal Notice]:', err);
    }
  }
  return null;
};
