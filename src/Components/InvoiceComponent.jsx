import React from "react";

const InvoiceComponent = () => {
  const items = [
    {
      id: 1,
      description: "UI/UX Design",
      quantity: 2,
      unitPrice: 50000,
    },
    {
      id: 2,
      description: "Frontend Development",
      quantity: 1,
      unitPrice: 150000,
    },
    {
      id: 3,
      description: "Hosting Setup",
      quantity: 1,
      unitPrice: 30000,
    },
  ];

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  const tax = 0;
  const total = subtotal + tax;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <>
      
      <div className="invoice-container">

        {/* HEADER */}
        <div className="top-section">
          <div className="company-details">
            <h1>FinTrack Pro</h1>
            <p>123 Business Street</p>
            <p>Abuja, Nigeria</p>
            <p>Email: info@company.com</p>
            <p>Phone: +234 800 000 0000</p>
          </div>

          <div className="invoice-details">
            <h2>INVOICE</h2>
            <p>
              <strong>Invoice No:</strong> INV-001
            </p>
            <p>
              <strong>Date:</strong> 14 May 2026
            </p>
            <p>
              <strong>Due Date:</strong> 21 May 2026
            </p>
          </div>
        </div>

        {/* BILLING SECTION */}
        <div className="billing-section">
          <div className="bill-box">
            <h3>Bill To</h3>
            <p>Client Name</p>
            <p>Client Company</p>
            <p>client@email.com</p>
            <p>+234 800 000 0000</p>
          </div>

          <div className="bill-box">
            <h3>Payment Details</h3>
            <p>
              <strong>Bank:</strong> Example Bank
            </p>
            <p>
              <strong>Account Name:</strong> Your Company Ltd
            </p>
            <p>
              <strong>Account No:</strong> 0123456789
            </p>
            <p>
              <strong>Currency:</strong> NGN
            </p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.description}</td>

                <td>{item.quantity}</td>

                <td>{formatCurrency(item.unitPrice)}</td>

                <td>
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="totals-section">
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>{formatCurrency(subtotal)}</td>
              </tr>

              <tr>
                <td>Tax</td>
                <td>{formatCurrency(tax)}</td>
              </tr>

              <tr className="grand-total">
                <td>Total</td>
                <td>{formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="i-footer">
          <div>
            <p>
              <strong>Notes:</strong>
            </p>
            <p>Payment is due within 7 days.</p>
            <p>Thank you for your business.</p>
          </div>

          <div className="thank-you">
            THANK YOU!
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceComponent;