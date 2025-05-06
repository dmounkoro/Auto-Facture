import React, { useState } from 'react'
import jsPDF from 'jspdf'

export default function App() {
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }])

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }])

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + item.qty * item.price, 0)

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text(`Facture pour : ${customer}`, 10, 10)

    let y = 20
    items.forEach((item, i) => {
      doc.text(`${item.desc} - ${item.qty} x ${item.price} FCFA`, 10, y)
      y += 10
    })

    doc.text(`Total : ${calculateTotal()} FCFA`, 10, y + 10)
    doc.save('facture.pdf')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md mt-10 rounded">
      <h1 className="text-2xl font-bold mb-4">Éditeur de Facture</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Nom du client"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            className="border p-2 flex-1"
            placeholder="Description"
            value={item.desc}
            onChange={(e) => handleItemChange(index, 'desc', e.target.value)}
          />
          <input
            type="number"
            className="border p-2 w-20"
            placeholder="Qté"
            value={item.qty}
            onChange={(e) =>
              handleItemChange(index, 'qty', parseInt(e.target.value))
            }
          />
          <input
            type="number"
            className="border p-2 w-24"
            placeholder="Prix"
            value={item.price}
            onChange={(e) =>
              handleItemChange(index, 'price', parseFloat(e.target.value))
            }
          />
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter une ligne
        </button>
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Générer PDF
        </button>
      </div>
      <p className="mt-4 text-right font-bold">
        Total: {calculateTotal()} FCFA
      </p>
    </div>
  )
}
