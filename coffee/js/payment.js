function paymentSumary() {
   HTML = `
      <div class="payment-summary">
        <div class="payment-summary-title">Order Summary</div>
        <div class="payment-summary-row">
          <div>item(2):</div>
          <div class="payment-summary-money">$26.98</div>
        </div>
        <div class="payment-summary-row">
          <div>Shipping & Handling:</div>
          <div class="payment-summary-money">$0.00</div>
        </div>
        <div class="dash-1"></div>
        <div class="payment-summary-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$26.98</div>
        </div>
        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$2.70</div>
        </div>
        <div class="dash-2"></div>
        <div class="total-money">
          <div>Order total:</div>
          <div class="money">$40.67</div>
        </div>
        <button class="place-order-button">Place your order</button>
      </div>
   `
}