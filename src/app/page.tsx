'use client'

import api from './api'
import s from './styles.module.css'
import EditProductModal from '@/app/components/Modal'
import { useEffect, useRef, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import { saveAs } from 'file-saver'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [editProduct, setEditProduct] = useState(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.products.get()
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getProducts()
  }, [])

  return (
    <main className={s.container}>
      <div className={s.editor_area}>
        <h2 className={s.title}>Lista de Compras </h2>
        <form
          className={s.register_form}
          onSubmit={async (ev) => {
            ev.preventDefault()
            if (inputRef.current?.value) {
              setProducts([...products, { Nome: inputRef.current.value, Quantidade: 0 }])
              await api.products.post({ name: inputRef.current.value, amount: 0 })
              inputRef.current.value = ''
            }
          }}
        >
          <input
            ref={inputRef}
            placeholder="Anote o próximo item..."
            required
          />
          <button>Registrar</button>
        </form>
        <div className={s.table_area}>
          <table className={s.products_table}>
            <thead>
              <tr>
                {
                  Object.keys(products[0] || {})?.map((item, index) => (
                    <th key={index}>
                      {item}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.Nome}
                  </td>
                  <td>
                    {item.Quantidade}
                  </td>
                  <td>
                    <button
                      className={s.edit_button}
                      onClick={() => setEditProduct(products[index])}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className={s.remove_button}
                      onClick={async () => {
                        await api.products.delete({ name: item.Nome })
                        setProducts(state => state.filter((item, i) => i !== index))
                      }}>
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={s.export_area}>
          <button onClick={() => {
            const csvRows = [] as string[]

            const headers = Object.keys(products[0])
            headers.join(',')
            csvRows.push(headers.join(','))

            for (const row of products) {
              const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"')
                return `"${escaped}"`
              })
              csvRows.push(values.join(','))
            }

            const data = csvRows.join('\n')

            const blob = new Blob([data], { type: 'text/csv;charset=utf-8' })
            saveAs(blob, 'data.csv')
          }}>
            Exportar Lista
          </button>
        </div>
      </div>
      <EditProductModal
        isOpen={!!editProduct}
        product={editProduct}
        setProduct={setEditProduct}
        setProducts={setProducts}
      />
    </main >
  )
}
