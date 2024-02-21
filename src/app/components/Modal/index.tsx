'use client'

import api from '@/app/api'
import s from './styles.module.css'
import { useRef } from 'react'

const Modal = ({
    isOpen,
    product,
    setProduct,
    setProducts
}) => {

    const close = () => setProduct(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const amountRef = useRef<HTMLInputElement>(null)
    return (
        isOpen && <form
            className={s.container}
            onSubmit={async (ev) => {
                ev.preventDefault()
                await api.products.patch({
                    name: product.Nome,
                    newName: nameRef.current?.value,
                    amount: amountRef.current?.value
                })
                setProducts(state => {
                    const index = state.findIndex(item => item.Nome === product.Nome)
                    state[index] = {
                        Nome: nameRef.current?.value,
                        Quantidade: amountRef.current?.value
                    }
                    return [...state]
                })
                close()
            }}
        >
            <h2 className={s.title}>Editar item</h2>
            <div className={s.edit_area}>
                <div className={s.input_area}>
                    <label>Nome</label>
                    <input
                        type="text"
                        defaultValue={product.Nome}
                        ref={nameRef}
                    />
                </div>
                <div className={s.input_area}>
                    <label>Quantidade</label>
                    <input
                        type="number"
                        defaultValue={product.Quantidade}
                        ref={amountRef}
                    />
                </div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => close()}
                >
                    Fechar
                </button>
                <button>Salvar</button>
            </div>
        </form>
    )
}
export default Modal