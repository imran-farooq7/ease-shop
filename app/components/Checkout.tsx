import {StripeElementsOptions} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/CartProvider";


const Checkout = () => {
    const { cart ,paymentIntent} = useCartStore();
    const [clientSecret, setClientSecret] = useState("");
    const createCustomerPaymentIntent = async () => {
		const res = await fetch("/api/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cart: cart,
				payment_intent_id: paymentIntent,
			}),
		});
		// if (res.status === 403) {
		// 	router.push("/api/auth/signin");
		// }
		const data = await res.json();
		// setClientSecret(data.paymentIntent.client_secret);
		// setPaymentIntent(data.paymentIntent.id);
	};
useEffect(() => {
    createCustomerPaymentIntent()
},[])
  return (
    <div>
      
    </div>
  )
}

export default Checkout
