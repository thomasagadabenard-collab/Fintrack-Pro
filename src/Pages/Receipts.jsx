import React, { useEffect, useState } from 'react'
import plus from '../assets/plus.svg.svg'
import remove from '../assets/delete.svg'
import downloadIcon from '../assets/arrow_down.svg'
import ReceiptComponent from '../Components/ReceiptComponent'

const Receipts = () => {

  const [history, setHistory] = useState(() => {
    const savedReceipts = localStorage.getItem("savingReceipt")

    return savedReceipts ? JSON.parse(savedReceipts) : []
  })

  const [selectedReceipt, setSelectedReceipt] = useState(null)
  
  const [receiptDetails, setReceiptDetails] = useState({
    customerName: '',
    paymentMethod: '',
    balance: ''
  })


  const [rows, setRows] = useState([
    {
      id: Date.now() + Math.random(),
      item: '',
      quantity: '',
      amount: ''
    }
  ])

  

  const handleRenderReceipt = (receipt) => {
    setSelectedReceipt(receipt)
  }

  const handleReceiptDetails = (e) => {

    const { name, value } = e.target

    setReceiptDetails({
      ...receiptDetails,
      [name]: value
    })
  }

  const handleRowChange = (id, field, value) => {

    const updatedRows = rows.map((row) =>
      row.id === id
        ? { ...row, [field]: value }
        : row
    )

    setRows(updatedRows)
  }


  const handleAddRow = () => {

    // GET LAST ROW
    const lastRow = rows[rows.length - 1]

    // VALIDATE INPUTS
    if (
      lastRow.item.trim() === '' ||
      lastRow.quantity === '' ||
      lastRow.amount === ''
    ) {

      alert('Please fill all fields before adding a new row')

      return
    }

    setRows([
      ...rows,
      {
        id: Date.now() + Math.random(),
        item: '',
        quantity: '',
        amount: ''
      }
    ])
  }

  const handleDeleteRow = (id) => {

    const filteredRows = rows.filter(
      (row) => row.id !== id
    )

    setRows(filteredRows)
  }

  const handleSave = () => {
  
    const isRowsEmpty = rows.length === 0

    const isInvalidRow = rows.some(
      (row) =>
        row.item.trim() === '' ||
        row.quantity === '' ||
        row.amount === ''
    )

    const isDetailsEmpty =
      receiptDetails.customerName.trim() === '' ||
      receiptDetails.paymentMethod.trim() === '' ||
      receiptDetails.balance === ''

    if (isRowsEmpty || isInvalidRow || isDetailsEmpty) {
      alert('Please fill all fields before saving')
      return
    }

    const newReceipt = {
      id: Date.now(),
      details: receiptDetails,
      items: rows
    }

    setHistory([...history, newReceipt])

    setReceiptDetails({
      customerName: '',
      paymentMethod: '',
      balance: ''
    })

    setRows([
      { id: Date.now(), item: '', quantity: '', amount: '' }
    ])
  }

  useEffect(() => {
    localStorage.setItem("savingReceipt", JSON.stringify(history))
  },[history])


  return (
    <><section className='receipt-page-wrapper'>
      <h1>Receipts Page</h1>

      <div>

        <table>

          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Payment Method</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>

            <tr>

              <td>
                <input
                  type="text"
                  placeholder='Customer name'
                  className='tab-input'
                  name='customerName'
                  value={receiptDetails.customerName}
                  onChange={handleReceiptDetails}
                />
              </td>

              <td>
                <input
                  type="text"
                  placeholder='Payment method'
                  className='tab-input'
                  name='paymentMethod'
                  value={receiptDetails.paymentMethod}
                  onChange={handleReceiptDetails}
                />
              </td>

              <td>
                <input
                  type="number"
                  placeholder='Balance'
                  className='tab-input'
                  name='balance'
                  value={receiptDetails.balance}
                  onChange={handleReceiptDetails}
                />
              </td>

            </tr>

          </tbody>

        </table>

      </div>


      <div>

        <table>

          <thead>

            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr key={row.id}>

                <td className='tab-index'>
                  {index + 1}
                </td>

                <td>

                  <input
                    type="text"
                    className='tab-input'
                    placeholder='Item name'
                    value={row.item}
                    onChange={(e) =>
                      handleRowChange(
                        row.id,
                        'item',
                        e.target.value
                      )
                    }
                  />

                </td>

                <td>

                  <input
                    type="number"
                    className='tab-input'
                    placeholder='Quantity'
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(
                        row.id,
                        'quantity',
                        e.target.value
                      )
                    }
                  />

                </td>

                <td>

                  <input
                    type="number"
                    className='tab-input'
                    placeholder='Amount paid'
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(
                        row.id,
                        'amount',
                        e.target.value
                      )
                    }
                  />

                </td>

                <td>

                  <img
                    src={remove}
                    alt="delete icon"
                    className='remove-img'
                    onClick={() =>
                      handleDeleteRow(row.id)
                    }
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

      </div>

      <button className='create-btn' onClick={handleSave}>
        Save
      </button>

      {history.length === 0 ? (
          <div>No history to display yet</div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Balance</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className='history-class'>
              {history.map((receipt, index) => (
                <tr key={receipt.id}>
                  
                  <td>{index + 1}</td>

                  <td>{receipt.details.customerName}</td>

                  <td>{receipt.details.paymentMethod}</td>

                  <td>{receipt.details.balance}</td>

                  <td>
                    {receipt.items.map((item) => item.item).join(", ")}
                  </td>

                  <td>
                    {receipt.details.amount}
                  </td>

                  <td>
                    {new Date().toLocaleDateString()}
                  </td>

                  <td>
                    <img
                      src={downloadIcon} 
                      alt="download"
                      className="download-icon"
                      onClick={() => handleRenderReceipt(receipt)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

            {
              selectedReceipt && (
                <ReceiptComponent
                  customerName={
                    selectedReceipt.details.customerName
                  }
                  paymentMethod={
                    selectedReceipt.details.paymentMethod
                  }
                  balance={
                    selectedReceipt.details.balance
                  }
                  rows={selectedReceipt.items}
                   onClose={() => setSelectedReceipt(null)}
                />
              )
            }
           </section> </>
          )
        }

export default Receipts