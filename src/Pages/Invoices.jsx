import React, { useEffect, useState } from 'react'
import plus from '../assets/plus.svg.svg'
import downloadicon from '../assets/arrow_down.svg'
import InvoiceComponent from '../Components/InvoiceComponent'

const Invoices = () => {

 const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("saveHistory")

      if (!saved) return []

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed.filter(item => item && typeof item === "object")
        : []
    } catch {
      return []
    }
  })

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
      id: Date.now() + Math.random(),
      item: '',
      quantity: '',
      price: ''
    }
  ])

  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const handleRenderInvoice = (inv) => {
    setSelectedInvoice(inv)
  }

  const handleRowChange = (id, field, value) => {
    setInvoiceTable(prev =>
      prev.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    )
  }

  const handleAddRow = () => {
    setInvoiceTable(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        item: '',
        quantity: '',
        price: ''
      }
    ])
  }

  const handleDeleteRow = (id) => {
    setInvoiceTable(prev => {
      if (prev.length === 1) return prev
      return prev.filter(row => row.id !== id)
    })
  }

  const handleError = () => {
    const err = {}

    if (!billTo.name.trim()) err.name = "Name cannot be empty"
    if (!billTo.company.trim()) err.company = "Kindly enter company name"
    if (!billTo.email.trim()) err.email = "Please enter email"
    if (!billTo.number.trim()) err.number = "Please enter phone number"

    if (!paymentDetails.bank.trim()) err.bank = "Bank required"
    if (!paymentDetails.accountName.trim()) err.accountName = "Account name required"
    if (!paymentDetails.accountNumber.trim()) err.accountNumber = "Account number required"
    if (!paymentDetails.currency.trim()) err.currency = "Currency required"

    invoiceTable.forEach((row, index) => {
      if (!row.item.trim()) err[`item-${index}`] = `Enter item for row ${index + 1}`
      if (!row.quantity.trim()) err[`qty-${index}`] = `Enter quantity for row ${index + 1}`
      if (!row.price.trim()) err[`price-${index}`] = `Enter price for row ${index + 1}`
    })

    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = () => {
    if (!handleError()) return

    const newInvoice = {
      id: Date.now() + Math.random(),
      ...billTo,
      ...paymentDetails,
      items: invoiceTable
    }

    setHistory(prev => [...prev, newInvoice])

    console.log("Saved:", newInvoice)
  }

  const handleDeleteHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("saveHistory", JSON.stringify(history)) 
  }, [history])

  return (
    <div>

      <h1>Invoice page</h1>

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
                <th></th>
                <th></th>
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
                  <td>
                    <img src={downloadicon} alt="download icon" className='download-icon' onClick={() => handleRenderInvoice(inv)}/>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteHistory(inv.id)} className='delete-btn'>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>

      <section>
        {selectedInvoice && (
          <InvoiceComponent
            name={selectedInvoice.name}
            company={selectedInvoice.company}
            email={selectedInvoice.email}
            number={selectedInvoice.number}
            bank={selectedInvoice.bank}
            accountName={selectedInvoice.accountName}
            accountNumber={selectedInvoice.accountNumber}
            currency={selectedInvoice.currency}
            items={selectedInvoice.items}
          />
        )}
      </section>

    </div>
  )
}

export default Invoices

  const [invoiceTable, setInvoiceTable] = useState([
    {
      id: Date.now() + Math.random(),
      item: '',
      quantity: '',
      price: ''
    }
  ])
