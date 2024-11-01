import {useState} from 'react'
import './App.css'

import {Button} from "./components/Button.tsx";
import {roll} from "./utils";
import {RollResultType} from "./types";
import {RollResult} from "./components/RollResult.tsx";
import {Dog, Unit} from "./classes";


function App() {
    const [results, setResults] = useState<RollResultType[]>([])

    const handleRoll = (difficulty: number) => {
        setResults((results) => [...results, roll(5, difficulty)])
    };

    const defaultUnit = new Unit("default");
    const dog = new Dog();

    console.log(defaultUnit.name, defaultUnit.getStats());
    console.log(dog.name, dog.getStats());

    return (
        <main>
            <div className="flex flex-col items-center justify-center">
                <div className="mb-3">
                    <Button onClick={() => {
                        handleRoll(5)
                    }}>Сложность 5</Button>
                    <Button onClick={() => {
                        handleRoll(6)
                    }}>Сложность 6</Button>
                    <Button onClick={() => {
                        handleRoll(7)
                    }}>Сложность 7</Button>
                    <Button onClick={() => {
                        handleRoll(8)
                    }}>Сложность 8</Button>
                    <Button onClick={() => {
                        handleRoll(9)
                    }}>Сложность 9</Button>
                    <Button onClick={() => {
                        handleRoll(10)
                    }}>Сложность 10</Button>
                </div>
                {results.map((result, index) => <RollResult key={index} result={result}/>)}
            </div>
        </main>

    )
}

export default App
