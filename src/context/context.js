import React, {useReducer,createContext} from 'react'

import contextReducer from './contextReducer'

const initialState = JSON.parse(localStorage.getItem('transitions')) || []

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({children}) => {
    const [transitions,dispatch] = useReducer(contextReducer,initialState)

    //Action Creators
    const deleteTransition =(id) => dispatch({type:'DELETE_TRANSITION',payload:id })
    const addTransition = (transition) => dispatch({type:'ADD_TRANSITION',payload:transition})

    const balance = transitions.reduce((acc,currVal) => {
        return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount)
    },0)

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransition,
            addTransition,
            transitions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}