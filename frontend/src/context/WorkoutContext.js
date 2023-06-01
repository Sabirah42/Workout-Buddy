import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

// could have also used useState hook to pass state to child
// first argument is the current state
// second argument is the object passed into 'dispatch' function - has type and payload properties
export const workoutsReducer = (state, action) => {
    // type describes the state change
    switch (action.type) {
        case 'SET_WORKOUTS':
            // payload represents any data we need to make that change
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            } 
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

// component that will wrap everything that needs context
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        //  'children' represents <App />
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}

