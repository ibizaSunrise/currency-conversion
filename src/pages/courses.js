import React, { useState, useEffect } from 'react'
import { fetchAllQuotesBySource } from '../store/currencySlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Courses() {
    const dispatch = useDispatch()
    const { allQuotes } = useSelector(state => state.currency)
    const [value, setValue] = useState('')

console.log(value)

    //handler
    function handlerEnter(e) {
        if (e.code === 'Enter') {
            dispatch(fetchAllQuotesBySource(value))
            setValue('')
           
        } 
    }

    useEffect(() => {
        dispatch(fetchAllQuotesBySource('usd'))
    }, [])


    return (
        <>
            <input className="form-control form-control-lg mb-3" placeholder='USD' type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => handlerEnter(e)} />
            <table className='table'>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Curses</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allQuotes.map((el, index) => (<tr key={index} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
                            <td>{el[0]}</td>
                            <td>{el[1]}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
