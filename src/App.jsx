import { useState } from "react";

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
    function Start(){
        if(!loadedIn)
            LoadCoins();

        if(coins > 0)
        {
            setCoins(coins - 10);
        }
        else
            setCoins(50);
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

    function LoadCoins(){
        fs.readFile('./Index.html', function read(err, data) {
            if (err) {
                throw err;
            }
            const content = data;

            // Invoke the next step here however you like
            console.log(content);   // Put all of the code here (not the best solution)
            processFile(content);   // Or put the next step in a function and invoke it
        });
    }

}

export default App;


