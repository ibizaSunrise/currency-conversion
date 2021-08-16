import React, { useState, useEffect } from 'react'
import { fetchQuote, fetchSupportedCurrencies } from '../store/currencySlice'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from '../store/currencySlice'

export default function Converter() {
  const { supportedCurrencies, amount, quote } = useSelector(state => state.currency)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(0)


  useEffect(() => {
    dispatch(fetchSupportedCurrencies())
  }, [])

  function handlerEnter(e) {
    if (e.code === 'Enter') {
      let str = value.trim();
      const regExp = /^\d+\.?\d*\s+\w{3}\s+\w{2}\s+\w{3}$/;
      if (regExp.test(str)) {
        setMessage('')
        let [sum, source, , cur] = str.split(' ');
        dispatch(fetchQuote({ currencies: cur, source: source }))
        dispatch(setAmount(sum))
        setResult((Math.floor((amount * quote) * 100) / 100))

      } else {
        setMessage('Incorrect Data!')
        setValue('')
        setResult(0)
      }

    }
  }
  return (
    <div>

      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="15 usd in eur"
        value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => handlerEnter(e)}
      ></input>
      <input className="form-control form-control-lg mt-3" type="text" value={result} disabled ></input>

      <p>{message}</p>


      <table className='table'>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            supportedCurrencies.map((el, index) => (<tr key={index} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
              <td>{el[0]}</td>
              <td>{el[1]}</td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
