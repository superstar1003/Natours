import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51Hrzi0LOnIqRlpuA122OcF85Pya1x2JQgLWefdf2CifvKa6luUvNtaDK58IipZO1xHpVG5HxuOLJgi2V6u16m8BE00wcomgcYH'
  );
  try {
    //1.) GET checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    console.log(session);
    //2.) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
