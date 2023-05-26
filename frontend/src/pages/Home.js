import { useEffect, useState} from 'react'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const [workouts, setworkouts] = useState(null)

// empty array as second argument ensures that this only fires on first render
    useEffect(() => {
        const fetchWorkouts  = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                setworkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

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