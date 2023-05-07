import {useState, useEffect} from 'react'

const PREFIX = 'dev-pen'

export default function uselocalstorage(key, initialValue) 
{
    const prefixedkey = PREFIX+ key
    
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedkey)
        if ( jsonValue != null) return JSON.parse(jsonValue)
        if ( typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedkey, JSON.stringify(value))
    },[prefixedkey, value])
    
    return [value, setValue]
}