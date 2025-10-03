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

  //Funções que serão removidas futuramente: 
  function sortCards() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const zoado: number[] = [...cards];
    for (let i = zoado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [zoado[i], zoado[j]] = [zoado[j], zoado[i]];
    }
    setSeuDeck([{ numero: zoado[0], tipo: "comum" }, { numero: zoado[1], tipo: "comum" }]);
    zoado.shift();
    zoado.shift();
    setDeckInimigo([{ numero: zoado[0], tipo: "escondida" }, { numero: zoado[1], tipo: "comum" }]);
  }


  async function askCard(who: number) {
    const carta = await askMoreCards(who)
    setSeuDeck((prev) => [...prev, carta]);
    setSuaJogada(false);
  }

  function clearErrorCards() {
    console.log("Limpando cartas de erro");
    setSeuDeck((prev) => prev.filter((carta) => carta.tipo != "ERROR"));
  }

  /*
  const baralho = [
    { numero: 1, tipo: "escondida" },
    { numero: 2, tipo: "comum" },
    { numero: 3, tipo: "comum" },
    { numero: 4, tipo: "comum" },
    { numero: 5, tipo: "comum" },
    { numero: 6, tipo: "comum" },
    { numero: 7, tipo: "comum" }
  ]
    */
  const baralho: baralho[] = []

  const [seuDeck, setSeuDeck] = useState<baralho[]>(baralho)
  const [deckInimigo, setDeckInimigo] = useState<baralho[]>(baralho)
  const [suaJogada, setSuaJogada] = useState<boolean>(true)

  useEffect(() => {
    sortCards();
    //setSeuDeck((prev) => [...prev, askMoreCards(1)])
    //clearErrorCards();
    setInterval(() => {
      clearErrorCards();
    }, 5000);
  }, [])


  return (
    <div>
      <div className={styles.mesa} >
        <section className={styles.deck}>
          {
            deckInimigo.map((carta, i) => (
              <Cards key={i} numero={carta.numero} tipo={carta.tipo} />
            ))
          }
        </section>

        <section className={styles.deck} >
          {
            seuDeck.map((carta, i) => (
              <Cards key={i} numero={carta.numero} tipo={carta.tipo} />
            ))
          }
        </section>
      </div>
      <div>
        <button className={styles.botao1} onClick={() => { if (suaJogada) askCard(1) }} >Pedir carta</button>
        <button className={styles.botao2} onClick={() => { if (suaJogada) console.log("Fazer o back-end"); setSuaJogada(false)}}>Passar</button>
      </div>
    </div>
  )
}