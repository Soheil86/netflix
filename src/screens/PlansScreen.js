import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db from '../firebase'
import './PlansScreen.css'

function PlansScreen() {
  const [products, setProducts] = useState([])
  const user = useSelector(selectUser)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscription')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((subscription) => {
          setSubscription({
            role: subscription.date().role,
            current_period_end: subscription.date().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          })
        })
      })
  }, [user.uid])

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        const products = {}
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data()
          const priceSnap = await productDoc.ref.collection('prices').get()
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            }
          })
        })
        setProducts(products)
      })
  }, [])

  console.log(products)
  console.log(subscription)

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data()

      if (error) {
        alert(`An error occured: ${error.message}`)
      }

      if (sessionId) {
        // we have a session, lets redirect to checkout
        // Init Strip
        const stripe = await loadStripe(
          'pk_live_51LZvCGGN9GYi1cwz2oonyKaxrnm3ZekmZmkfPuH8yDfhGsIpQvPSh51Jv8LcU8okgSFjvFcqAnzER5tBR8w6eDx700CJMguAIR'
        )
        stripe.redirectToCheckout({ sessionId })
      }
    })
  }

  return (
    <div className='plansScreen'>
      {subscription && (
        <p>
          Renewal date:{' '}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role)
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && 'planScreen__plan--disable'
            } planScreen__plan`}
          >
            <div className='planScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? 'Current Package' : 'Subscription'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default PlansScreen
