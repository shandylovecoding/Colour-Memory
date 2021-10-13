import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";



export default function App() {
  const [openedCard, setOpenedCard] = useState([])
  const [matched, setMatched] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [modal, setModal] = useState(true);
  const [name, setName] = useState('');

  const toggle = () => setModal(!modal);
  const submit = () => {
    axios.post("http://localhost:8080/api/score", { name : name, score : currentScore})
  }

  const [cards] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ])
  const pairOfcards = [...cards, ...cards]

  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index])
  }
  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfcards[openedCard[0]];
    const secondMatched = pairOfcards[openedCard[1]]

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id, secondMatched.id])
      setCurrentScore(currentScore + 5)
    } else if (secondMatched && firstMatched.id !== secondMatched.id) {
      setCurrentScore(currentScore - 1)
    }


    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000)

  }, [openedCard])


  return (
    <div className="App">

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><h1>Congratuation!</h1></ModalHeader>
        <ModalBody>
          <h1>Your Score is {currentScore}!!</h1>
          <h1>Please Put Down Your Name</h1>
          <input label="Name" variant="filled"  required  value={name}  onChange={e => setName(e.target.value)}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit}> Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div className="header">
        <div className="logo">

        </div>
        <div className="currentScore">
          <h1> Current Score:  {currentScore}</h1>
        </div>
        <div className="higherScore">
          <button> Higher Score</button>
        </div>
      </div>
      <div className="cards">
        {pairOfcards.map((card, index) => {
          let isFlipped = false
          let isMatched = false
          if (openedCard.includes(index)) isFlipped = true
          if (matched.includes(card.id)) isMatched = true
          if (matched.length == pairOfcards.length) setModal(true)

          return (
            <div
              className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              key={index}
              onClick={() => flipCard(index)}>
              <div className="inner">
                <div className="front">
                  <p>{card.id}</p>
                </div>
                <div className="back"></div>
              </div>
            </div>
          )
        }
        )}


      </div>
    </div >
  );
}