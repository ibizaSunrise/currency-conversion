import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const access_key = 'a1a07be30ac9ab48c6bff8747155d4c6';
const endpoints = ['live', 'list'];
const baseUrl = 'http://api.currencylayer.com/'



export const fetchSupportedCurrencies = createAsyncThunk(
    'currency/fetchSupportedCurrencies',
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`${baseUrl}${endpoints[1]}?access_key=${access_key}`);

            if (!response.ok) {
                throw new Error('Server Error')
            }

            const data = await response.json();
            dispatch(setSupportedCurrencies(Object.entries(data.currencies)))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const fetchQuote = createAsyncThunk(
    'currency/fetchQuote',
    async function ({ currencies, source }, { rejectWithValue, dispatch }) {

        try {
            const response = await fetch(`${baseUrl}${endpoints[0]}?access_key=${access_key}&currencies= ${currencies} & source = ${source} `);
            if (!response.ok) {
                throw new Error('Server Error')
            }
            const data = await response.json();
            const quote = Object.values(data.quotes);
            dispatch(setQuote(quote[0]))

            // return data;

        } catch (e) {
            return rejectWithValue(e.message)
        }

    }
)

export const fetchAllQuotesBySource = createAsyncThunk(
    'currency/fetchAllQuotesBySource',
    async function ({ source }, { rejectWithValue, dispatch }) {

        try {

            const response = await fetch(`${baseUrl + endpoints[0]}?access_key=${access_key}& source = ${source}`);
          
            if (!response.ok) {
                throw new Error('Server Error')
            }
            const data = await response.json();
       console.log(data)
            const quotes = Object.entries(data.quotes);
            dispatch(setAllQuotes(quotes))

        } catch (e) {
            return rejectWithValue(e.message)
        }

    }
)


//helper
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        supportedCurrencies: [],
        amount: 0,
        quote: 0,
        error: null,
        status: null,
        allQuotes: []

    },
    reducers: {
        
        setAmount(state, action) {
            state.amount = action.payload;
        },
        setQuote(state, action) {
            state.quote = action.payload;
        },
        setSupportedCurrencies(state, action) {
            state.supportedCurrencies = action.payload
        },
        setAllQuotes(state, action){
            state.allQuotes = action.payload;
        }

    },
    extraReducers: {
        [fetchQuote.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchQuote.fulfilled]: (state) => {
            state.status = 'resolved';     
        },
        [fetchQuote.rejected]: setError,
        [fetchSupportedCurrencies.rejected]: setError,
        [fetchAllQuotesBySource.rejected]: setError,

    }
})


export const { setAmount, setQuote, setSupportedCurrencies, setAllQuotes } = currencySlice.actions
export default currencySlice.reducer