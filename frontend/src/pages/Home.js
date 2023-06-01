import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const {workouts, dispatch } = useWorkoutsContext()

// empty array as second argument ensures that this only fires on first render
    useEffect(() => {
        const fetchWorkouts  = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
        // dispatch is an external function that is not defined within useEffect, so must be added 
        // to the array in the second argument
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home