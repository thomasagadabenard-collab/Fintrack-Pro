import React, { useState } from 'react'

const Receipts = () => {

  const [receiptDetails, setReceiptDetails] = useState([ 
    
  ])
  return (
    <>
      <h1>Receipts pages</h1>
      <div>
        <div className='receipt-grid'>
          <input type="text" placeholder='Customer name'/>
          <input type="text" placeholder='payment method' />
          <input type="text" placeholder='Purchased item'/>
          <input type="text" placeholder='Quantity of item'/>
          <input type="number" placeholder='Amount received'/>
          <input type="number" placeholder='balance'/>
        </div>
        <button className='create-btn'>Save and Download Receipt</button>
      </div>
    </>
  )
}

export default Receipts
