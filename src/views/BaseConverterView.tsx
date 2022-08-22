import React, { ChangeEvent, useState } from 'react'
import BaseConverter from '../types/BaseConverter'

const converter:BaseConverter[] = [
    {value: "Binary", validation:"Enter either 0 or 1", regex: /^[0-1]+$/g, base:2},
    {value: "Octal", validation:"Enter digit in range of 0 until 8", regex: /^[0-8]+$/g, base: 8},
    {value: "Hexadecimal", validation:"Enter digit in range of 0 until 16", regex: /^[0-16]+$/g, base: 16}
]


function BaseConverterPage() {

    const [inputText, setInputText] = useState<string>('')
    const [outputText, setOutputText] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [from, setFrom] = useState<BaseConverter|any>(converter[0])

    const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault() // prevents refresh of the browser

        if(inputText.match(from.regex) == null){
            setErrorMessage(from.validation)
            return
        }

        setErrorMessage('')
        const reversedInputText = inputText.split('').map(Number).reverse()
        const result:Number = reversedInputText.reduce(
            (accumulator, currentValue, idx) =>
            accumulator + currentValue * Math.pow(from.base, idx)
        )
        setOutputText(result.toString())
    }

    const changeConverter = (e: ChangeEvent<HTMLSelectElement>) => {
        setFrom(converter.find(c => c.value === e.target.value))
    }



  return (
    <>
    <h1>Base Number Converter</h1>
    <form onSubmit={onFormSubmit}>
        {errorMessage && <span style={{ color: 'red'}}>{errorMessage}</span>}
        <br />
        <span>
            <select value={from.value} onChange={changeConverter}>
            {converter.map(c => <option key={c.value} value={c.value} label={c.value}></option>)}
            </select>
        </span>
        <div>
            <input type="text" name='input' placeholder={from.validation} value={inputText} onChange={e => setInputText(e.target.value)} />
            <button type='submit'>Convert</button>
        </div>
    </form>
    <label>Decimal Output</label>
    <input type="text" value={outputText} disabled/>
    </>
  )
}

export default BaseConverterPage