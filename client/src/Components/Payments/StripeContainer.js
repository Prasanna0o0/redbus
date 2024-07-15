import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51PZsXdRti48dCbwUAvMqjgTSATMg3vFnL5TghkjaMRYKkRXMHID8dtRvIorvVweTnbyZdJskypyFF7B9NAW27XqW00mozJQMfI"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
