import React from "react";

const ReceiptComponent = () => {
  const items = [
    {
      id: 1,
      name: "Premium UI Kit",
      qty: 2,
      price: 25000,
    },
    {
      id: 2,
      name: "Website Development",
      qty: 1,
      price: 180000,
    },
    {
      id: 3,
      name: "Hosting & Domain",
      qty: 1,
      price: 35000,
    },
  ];

  const subtotal = items.reduce(
    (acc, item) => acc + item.qty * item.price,
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

  return (
    <>
    <div className="receipt-wrapper">
        <div className="receipt-card">

          {/* HEADER */}
          <div className="receipt-header">
            <h1>RECEIPT</h1>
            <p>Payment Successfully Completed</p>
          </div>

          {/* BODY */}
          <div className="receipt-body">

            {/* INFO */}
            <div className="info-row">
              <span className="info-label">Receipt No</span>
              <span className="info-value">RCPT-2026-001</span>
            </div>

            <div className="info-row">
              <span className="info-label">Date</span>
              <span className="info-value">14 May 2026</span>
            </div>

            <div className="info-row">
              <span className="info-label">Customer</span>
              <span className="info-value">John Doe</span>
            </div>

            <div className="info-row">
              <span className="info-label">Payment Method</span>
              <span className="info-value">Bank Transfer</span>
            </div>

            <div className="divider"></div>

            {/* ITEMS */}
            <h3 className="items-title">
              Purchased Items
            </h3>

            {items.map((item) => (
              <div className="item" key={item.id}>

                <div className="item-left">
                  <h4>{item.name}</h4>
                  <p>
                    Qty: {item.qty}
                  </p>
                </div>

                <div className="item-price">
                  {formatCurrency(item.qty * item.price)}
                </div>

              </div>
            ))}

            <div className="divider"></div>

            {/* SUMMARY */}
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

            {/* STATUS */}
            <div className="status">
              Payment Successful
            </div>

            {/* FOOTER TEXT */}
            <div className="r-footer">
              <p>
                Thank you for your purchase.
              </p>

              <p>
                This receipt serves as proof of payment.
              </p>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="receipt-footer">
            © 2026 Your Company — All Rights Reserved
          </div>

        </div>
    </div>
    </>
  );
};

export default ReceiptComponent;