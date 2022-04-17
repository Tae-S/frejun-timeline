import './homeStyles.css'
import { useState } from "react"
import { login as userLogin, register } from '../features/users'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, setLogin] = useState(true)
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const handleChoiceClick = e => {
        const _choice = e.target.textContent
        if(_choice === 'Login') setLogin(true)
        else if(_choice === 'Register') setLogin(false)
    }
    const handleChange = e => {
        const _field = e.target.name
        setValues(prevState => {
            if(_field === 'username') return {...prevState, username: e.target.value}
            else if(_field === 'password') return {...prevState, password: e.target.value}
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        //need to dispatch
        if(login) dispatch(userLogin(values))
        else dispatch(register(values))
        const current_user = JSON.parse(localStorage.getItem('timeline-current'))
        console.log(current_user)
        if(current_user){
            setTimeout(()=>{
                navigate('/users')
            }, 800)
        }
    }
    return(
        <>
            <div className="form-container">
                <div className="form-choice">
                    <p onClick={e => handleChoiceClick(e)}>Login</p>
                    <p onClick={e => handleChoiceClick(e)}>Register</p>
                </div>
                <form action='/' method='POST' onSubmit={e => handleSubmit(e)}>
                    <label htmlFor='username'>
                        Username
                        <input name='username' id='username' type='text' placeholder="username" value={values.username} onChange={e => handleChange(e)} required />
                    </label>
                    <label htmlFor='password'>
                        Password
                        <input name='password' id='password' type='password' placeholder="●●●●●●●●" value={values.password} onChange={e => handleChange(e)} required />
                    </label>
                    <input className="btn" type='submit' value={login?'Login':'Register'} onSubmit={e => handleSubmit(e)}/>
                </form>
            </div>
        </>
    )
}

export default Home