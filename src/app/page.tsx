'use client'

import { useEffect, useRef, useState } from 'react'
import api from './api'
import s from './styles.module.css'

export default function Home() {
  const [products, setProducts] = useState<any[]>()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.products.get()
        setProducts(response.data)
        console.log(response.data)
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
              await api.products.post({ name: inputRef.current.value })
              return inputRef.current.value = ''
            }
          }}
        >
          <input
            ref={inputRef}
            placeholder="Anote o primeiro item..."
            required
          />
          <button>Registrar</button>
        </form>
        <table className={s.products_table}>
          <tbody>
            {products?.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
