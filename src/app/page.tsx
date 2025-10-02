'use client'
import Cards from "@/components/cards"
import styles from "./page.module.css"
import { useState, useEffect } from "react"
import askMoreCards from "./functions/askCard"

interface baralho {
  numero: number
  tipo: string
}


export default function Main() {
  const baralho = [
    { numero: 1, tipo: "escondida" },
    { numero: 2, tipo: "comum" },
    { numero: 3, tipo: "comum" },
    { numero: 4, tipo: "comum" },
    { numero: 5, tipo: "comum" },
    { numero: 6, tipo: "comum" },
    { numero: 7, tipo: "comum" }
  ]

  const [deck, setDeck] = useState<baralho[]>(baralho)

  useEffect(()=>{
    setDeck((prev)=> [...prev, askMoreCards(1)])
  },[])


  return (
    <div className={styles.mesa} >
      <section className={styles.deck} >
        {
          deck.map((carta) => (
            <Cards key={carta.numero} numero={carta.numero} tipo={carta.tipo} />
          ))
        }
      </section>

      <section className={styles.deck} >
        {
          deck.map((carta) => (
            <Cards key={carta.numero} numero={carta.numero} tipo={carta.tipo} />
          ))
        }
      </section>
    </div>
  )
}