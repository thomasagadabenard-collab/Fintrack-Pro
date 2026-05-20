import React, { useState } from 'react'
import plus from '../assets/plus.svg.svg'

const Invoices = () => {

  // ✅ store invoices properly as ARRAY
  const [history, setHistory] = useState([])

  // ✅ store errors separately
  const [errors, setErrors] = useState({})

  const [billTo, setBillTo] = useState({
    name: '',
    company: '',
    email: '',
    number: ''
  })

  const [paymentDetails, setPaymentDetails] = useState({
    bank: '',
    accountName: '',
    accountNumber: '',
    currency: ''
  })

  const [invoiceTable, setInvoiceTable] = useState([
    {
      id: Date.now(),
      item: '',
      quantity: '',
      price: ''
    }
  ])

  // ROW HANDLING 
  const handleRowChange = (id, field, value) => {
    const updatedRows = invoiceTable.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    )

    setInvoiceTable(updatedRows)
  }

 const handleAddRow = () => {

  const lastRow = invoiceTable[invoiceTable.length - 1]

  if (
    !lastRow.item.trim() ||
    !lastRow.quantity.trim() ||
    !lastRow.price.trim()
  ) return

  const newRow = {
    id: Date.now() + Math.random(),
    item: '',
    quantity: '',
    price: ''
  }

  setInvoiceTable([...invoiceTable, newRow])
}

  // VALIDATION
  const handleError = () => {

    const err = {}

    if (!billTo.name) err.name = "Name cannot be empty"
    if (!billTo.company) err.company = "Kindly enter company name"
    if (!billTo.email) err.email = "Please enter email"
    if (!billTo.number) err.number = "Please enter phone number"

    if (!paymentDetails.bank) err.bank = "Bank required"
    if (!paymentDetails.accountName) err.accountName = "Account name required"
    if (!paymentDetails.accountNumber) err.accountNumber = "Account number required"
    if (!paymentDetails.currency) err.currency = "Currency required"

    invoiceTable.forEach((row, index) => {
      if (!row.item) err[`item-${index}`] = `Enter item for row ${index + 1}`
      if (!row.quantity) err[`qty-${index}`] = `Enter quantity for row ${index + 1}`
      if (!row.price) err[`price-${index}`] = `Enter price for row ${index + 1}`
    })

    setErrors(err)

    return Object.keys(err).length === 0
  }

  const handleSubmit = () => {

    const isValid = handleError()
    if (!isValid) return

    const newInvoice = {
      id: Date.now(),
      ...billTo,
      ...paymentDetails,
      items: invoiceTable
    }

    setHistory([...history, newInvoice])

    console.log("Saved:", newInvoice)
  }

  return (
    <div>

      <h1>Invoices page</h1>

      <section>

        {/* CLIENT DETAILS */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input
                  value={billTo.name}
                  onChange={(e) =>
                    setBillTo({ ...billTo, name: e.target.value })
                  }
                  placeholder="Client Name"
                  className='tab-input'
                />
              </td>

              <td>
                <input
                  value={billTo.company}
                  onChange={(e) =>
                    setBillTo({ ...billTo, company: e.target.value })
                  }
                  placeholder="Company"
                  className='tab-input'
                />
              </td>

              <td>
                <input
                  value={billTo.email}
                  onChange={(e) =>
                    setBillTo({ ...billTo, email: e.target.value })
                  }
                  placeholder="Email"
                  className='tab-input'
                />
              </td>

              <td>
                <input
                  value={billTo.number}
                  onChange={(e) =>
                    setBillTo({ ...billTo, number: e.target.value })
                  }
                  placeholder="Phone"
                  className='tab-input'
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* PAYMENT DETAILS */}
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  value={paymentDetails.bank}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, bank: e.target.value })
                  }
                  placeholder="Bank"
                  className='tab-input'
                />
              </td>

              <td>
                <input
                  value={paymentDetails.accountName}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, accountName: e.target.value })
                  }
                  placeholder="Account Name"
                  className='tab-input'
                />
              </td>

              <td>
                <input
                  value={paymentDetails.accountNumber}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })
                  }
                  placeholder="Account Number"
                  className='tab-input'
                />
              </td>

              <td>
                <input
                  value={paymentDetails.currency}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, currency: e.target.value })
                  }
                  placeholder="Currency"
                  className='tab-input'
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* INVOICE TABLE */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {invoiceTable.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>

                <td>
                  <input
                    value={row.item}
                    onChange={(e) =>
                      handleRowChange(row.id, 'item', e.target.value)
                    }
                    placeholder="Item"
                    className='tab-input'
                  />
                </td>

                <td>
                  <input
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(row.id, 'quantity', e.target.value)
                    }
                    placeholder="Qty"
                    className='tab-input'
                  />
                </td>

                <td>
                  <input
                    value={row.price}
                    onChange={(e) =>
                      handleRowChange(row.id, 'price', e.target.value)
                    }
                    placeholder="Price"
                    className='tab-input'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='plus-image-container'>
        
          <img
            src={plus}
            alt="plus icon"
            className='plus-image'
            onClick={handleAddRow}
          />
        
        </div>

        <button className='create-btn' onClick={handleSubmit}>
          Save Invoice
        </button>

      </section>

      {/* HISTORY */}
      <section>

        {history.length === 0 ? (
          <div>No history to display yet</div>
        ) : (
          <table className='invoice-history-table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bank</th>
                <th>Account</th>
                <th>Number</th>
                <th>Currency</th>
              </tr>
            </thead>

            <tbody>
              {history.map((inv, i) => (
                <tr key={inv.id}>
                  <td>{i + 1}</td>
                  <td>{inv.name}</td>
                  <td>{inv.company}</td>
                  <td>{inv.email}</td>
                  <td>{inv.number}</td>
                  <td>{inv.bank}</td>
                  <td>{inv.accountName}</td>
                  <td>{inv.accountNumber}</td>
                  <td>{inv.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>

    </div>
  )
}

export default Invoices