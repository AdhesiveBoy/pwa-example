import { useState } from "react";
import fs from "fs";

function App() {
    const [won,setWon] = useState(false);
    const [dealerCards,setDealerCards] = useState(0);
    const [playing,setPlaying] = useState(false);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [coins, setCoins] = useState(50);
    const [loadedIn, setLoadedIn] = useState(false);


    return (
        <>
            <nav>{coins} coins</nav>
            <main>
                <h1>Black Jack</h1>
                <h2 hidden={playing}> {won?"Won":"Lost"} </h2>
                <div className={"box"}>
                    <h3 className={"in_box"}>dealer</h3>
                    <h2 className={"in_box"}>{dealerCards === 0? "?":dealerCards}</h2>
                </div>
                <div className={"box"}>
                    <h3 className={"in_box"}> you </h3>
                    <h2 className={"in_box"}>{playerTotal}</h2>
                </div>
                <button onClick={() => Start()}>start (-10 coins)</button>
                <button onClick={() => AddCard()} hidden={!playing}>drawCard</button>
                <button onClick={() => ShowDealerCards()} hidden={!playing}>ShowOff</button>
            </main>
        </>
    );
    function AddCard(){
        var newTotal = playerTotal + DrawCard();
        setPlayerTotal(newTotal);
        if(newTotal > 21){
            EndGame(true);
        }

    }
    async function Start(){
        let currentCoins = coins.toString();
        if(!loadedIn)
        {
            await fetch("../src/coins.json")
                .then((res) => {return res.json()})
                .then((json) => {
                    let file = JSON.parse(JSON.stringify(json));
                    console.log("coins value = " + file.coins);
                    setLoadedIn(true);
                    currentCoins = file.coins;
                })
                .catch((e) => console.error(e));
        }
        console.log(currentCoins);

        if(currentCoins > 0)
        {
            UploadCoins(currentCoins - 10);
        }
        else
            UploadCoins(50);
        setPlaying(true);
        var newTotal = DrawCard();
        newTotal += DrawCard();
        setPlayerTotal(newTotal);
        setDealerCards(0);
    }

    function DrawCard(){
        return Math.floor(Math.random() * 10);
    }

    function ShowDealerCards(){
        EndGame(false);
    }
    function EndGame(failedForced){
        setPlaying(false);

        if(failedForced){
            setWon(false);
        }
        else{
            var dealerDrawnCards = Math.floor(Math.random() * 8) + 13;
            setDealerCards(dealerDrawnCards);
            if(playerTotal > dealerCards || playerTotal === 21){
                setWon( true);
                setCoins(coins + 20);
            }
            else {
                setWon(false);
            }
        }
    }

    async function LoadCoins(){
        await fetch("../src/coins.json")
            .then((res) => {return res.json()})
            .then((json) => {
                let file = JSON.parse(JSON.stringify(json));
                console.log("coins value = " + file.coins);
                setLoadedIn(true);
                let coin = file.coins;
                return coin;
            })
            .catch((e) => console.error(e));
    }
    async function UploadCoins(coins){
        const coinFile = {"coins":coins};
        let newRaw = JSON.stringify(coinFile);
        const fs = require('fs');
        fs.readFile("../src/coins.json");
        fs.writeFileSync("../src/coins.json", newRaw);
        setCoins(coins);
    }
}

export default App;


