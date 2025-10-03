'use client'
import Cards from "@/components/cards"
import styles from "./page.module.css"
import { useState, useEffect } from "react"
import askMoreCards from "./functions/askCard"

interface baralho {
  numero: number
  tipo: string
}

let possibleCards: number[] = [];

export default function Main() {

  //Funções que serão removidas futuramente: 
  function sortCards() {
    const totalCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    possibleCards = [...totalCards];
    for (let i = possibleCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [possibleCards[i], possibleCards[j]] = [possibleCards[j], possibleCards[i]];
    }
    setSeuDeck([{ numero: possibleCards[0], tipo: "comum" }, { numero: possibleCards[1], tipo: "comum" }]);
    possibleCards.shift();
    possibleCards.shift();
    setDeckInimigo([{ numero: 0, tipo: "escondida" }, { numero: possibleCards[1], tipo: "comum" }]);
    possibleCards.shift();
    possibleCards.shift();
  };


  async function askCard(who: number,) {
    const carta = await askMoreCards(who, possibleCards);
    setSeuDeck((prev) => [...prev, carta]);
    setSuaJogada(false);
  };

  function clearErrorCards() {
    console.log("Limpando cartas de erro");
    setSeuDeck((prev) => prev.filter((carta) => carta.tipo != "ERROR"));
  };

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

  const [seuDeck, setSeuDeck] = useState<baralho[]>(baralho);
  const [deckInimigo, setDeckInimigo] = useState<baralho[]>(baralho);
  const [suaJogada, setSuaJogada] = useState<boolean>(true);
  const [showAllCards, setShowAllCards] = useState<boolean>(false);
  const [seusNumeros, setSeusNumeros] = useState<number>(0);
  const [numerosInimigo, setNumerosInimigo] = useState<number>(0);

  const [max21, setMax21] = useState<number>(21);


  useEffect(() => {
    sortCards();


    setInterval(() => {
      clearErrorCards();
    }, 5000);
  }, []);

  useEffect(() => {
    setSeusNumeros(seuDeck.reduce((acc, carta) => acc + carta.numero, 0));
    setNumerosInimigo(deckInimigo.reduce((acc, carta) => acc + carta.numero, 0));
  }, [seuDeck, deckInimigo]);


  return (
    <div>
      <div className={styles.mesa} >
        <section className={styles.deck}>
          {
            deckInimigo.length != 0 &&
            <Cards numero={`${numerosInimigo}+?`} tipo="soma" />
          }
          {
            deckInimigo.map((carta, i) => (
              <Cards key={i} numero={carta.numero} tipo={carta.tipo} show={showAllCards} />
            ))
          }
        </section>

        <section className={styles.deck} >
          {seuDeck.length != 0 &&
            <Cards numero={seusNumeros} tipo="soma" />}
          {
            seuDeck.map((carta, i) => (
              <Cards key={i} numero={carta.numero} tipo={carta.tipo} show={showAllCards} />
            ))
          }
        </section>
      </div>
      {seuDeck.length != 0 && <div>
        <button className={styles.botao1} onClick={() => { if (suaJogada && seusNumeros <= max21) askCard(1) }}>Pedir carta</button>
        <button className={styles.botao2} onClick={() => { if (suaJogada) console.log("Fazer o back-end"); setSuaJogada(false) }}>Passar</button>
      </div>}
    </div>
  );
};