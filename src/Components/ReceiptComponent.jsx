import React, { useState } from "react";

const ReceiptComponent = ({
  customerName,
  paymentMethod,
  balance,
  rows,
  onClose
}) => {
   const [closeReceipt, setCloseReceipt] = useState(false)
  
  const subtotal = rows.reduce(
    (acc, row) => acc + row.quantity * row.amount,
    0
  );

  const tax = subtotal * 0.075;
  const total = subtotal + tax;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleCloseReceipt = () => {
    setCloseReceipt(prev => !prev)
  }

  return (
    <>
    <div className="receipt-wrapper" onClick={onClose}>
        <div className="receipt-card">

          <div className="receipt-header">
            <h1>RECEIPT</h1>
            <p>Payment Successfully Completed</p>
          </div>

          <div className="receipt-body">

            <div className="info-row">
              <span className="info-label">Receipt No</span>
              <span className="info-value">RCPT-2026-001</span>
            </div>

            <div className="info-row">
              <span className="info-label">Date</span>
              <span className="info-value">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Customer</span>
              <span className="info-value">{customerName}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Payment Method</span>
              <span className="info-value">{paymentMethod}</span>
            </div>

            <div className="divider"></div>

            <h3 className="items-title">
              Purchased Items
            </h3>

            {rows.map((row) => (
              <div className="item" key={row.id}>

                <div className="item-left">
                  <h4>{row.item}</h4>
                  <p>
                    Qty: {row.quantity}
                  </p>
                </div>

                <div className="item-price">
                  {formatCurrency(row.quantity * row.amount)}
                </div>

              </div>
            ))}

            <div className="divider"></div>

            <div className="summary">

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="summary-row">
                <span>VAT (7.5%)</span>
                <span>
                  {formatCurrency(tax)}
                </span>
              </div>

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>
                  {formatCurrency(total)}
                </span>
              </div>

            </div>

            <div className="status">
              Payment Successful
            </div>

            <div className="r-footer">
              <p>
                Thank you for your purchase.
              </p>

              <p>
                This receipt serves as proof of payment.
              </p>
            </div>

          </div>

          <div className="receipt-footer">
            © 2026 FinTrack Pro — All Rights Reserved
          </div>

        </div>
    </div>
    </>
  );
};

export default ReceiptComponent;