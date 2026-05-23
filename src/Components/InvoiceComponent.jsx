import React from "react";
import { data } from "react-router-dom";

const InvoiceComponent = ({ name, company, email, number, bank, accountName, accountNumber, currency, dueDate, items }) => {

  const subtotal = (items || []).reduce((acc, item) => {
    return acc +
      (Number(item.quantity) || 0) *
      (Number(item.price) || 0);
  }, 0);

  const tax = 0;
  const total = subtotal + tax;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-NG").format(value);
  };

  return (
    <>
      <section className="invoice-component">
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
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>Due Date:</strong> {dueDate}
            </p>
          </div>
        </div>

        {/* BILLING SECTION */}
        <div className="billing-section">
          <div className="bill-box">
            <h3>Bill To</h3>
            <p>{name}</p>
            <p>{company}</p>
            <p>{email}</p>
            <p>{number}</p>
          </div>

          <div className="bill-box">
            <h3>Payment Details</h3>
            <p>
              <strong>Bank:</strong> {bank}
            </p>
            <p>
              <strong>Account Name:</strong> {accountName}
            </p>
            <p>
              <strong>Account No:</strong> {accountNumber}
            </p>
            <p>
              <strong>Currency:</strong> {currency}
            </p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <table className="items-table">
          <thead> 
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody >
            {items?.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>{item.item}</td>
                <td>{Number(item.quantity)}</td>
                <td>{formatNumber(Number(item.price))}</td>
                <td>{formatNumber(Number(item.quantity) * Number(item.price))}</td>
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
      </section>
    </>
  );
};

export default InvoiceComponent;