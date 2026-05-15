import React, { useState } from 'react'
import plus from '../assets/plus.svg.svg'

const Receipts = () => {

  const [receiptDetails, setReceiptDetails] = useState([])

  const [rows, setRows] = useState([
    {
      item: "",
      quantity: "",
      amount: ""
    }
  ])

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        item: "",
        quantity: "",
        amount: ""
      }
    ])
  }

  const handleDeleteRow = (id) => {
    const filteredRows = rows.filter((row) => row.id !== id)

    setRows(filteredRows)
  }

  return (
    <>
      <h1>Receipts pages</h1>

      <div>

        <div className='receipt-grid'>
          <input type="text" placeholder='Customer name' />
          <input type="text" placeholder='payment method' />
          <input type="number" placeholder='balance' />
        </div>

        <div>

          <table>

            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id}>
                    <td className='tab-index'>{index + 1}</td>

                    <td>
                      <input type="text" className='tab-input'/>
                    </td>

                    <td>
                      <input type="number" className='tab-input' />
                    </td>

                    <td>
                      <input type="number" className='tab-input' />
                    </td>

                    <td>
                      <button onClick={() => handleDeleteRow(row.id)}>
                        Delete
                      </button>
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

        <button className='create-btn'>
          Save and Download Receipt
        </button>

      </div>
    </>
  )
}

export default Receipts