import {StripeElementsOptions} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/CartProvider";
import { useRouter } from "next/navigation";
import { stripePromise } from "@/utils/helpers";


const Checkout = () => {
    const { cart ,paymentIntent,setPaymentIntent} = useCartStore();
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter()
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
		if (res.status === 403) {
			router.push("/api/auth/signin");
		}
		const data = await res.json();
		setClientSecret(data.paymentIntent.client_secret);
		setPaymentIntent(data.paymentIntent.id);
	};
useEffect(() => {
    createCustomerPaymentIntent()
},[])
const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
        theme: "stripe",
        labels: "floating",
    },
};
  return (
    <div>
      {clientSecret && (
				<div>
					<Elements stripe={stripePromise} options={options}>
                        <h1>Check form</h1>
					</Elements>
				</div>
			)}
    </div>
  )
}

export default Checkout
