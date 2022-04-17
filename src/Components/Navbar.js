import './navbarStyles.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar()
{
    const navigate = useNavigate()
    const current_user = JSON.parse(localStorage.getItem('timeline-current'))
    const handleClick = e => {
        console.log('clicked on: ', e.target)
        //if not logged in change
        console.warn(e.target.dataset.char)
        console.warn(Object.keys(current_user).length)
        if(Object.keys(current_user).length === 2 && e.target.dataset.char == 'login'){
            console.log('here')
            localStorage.setItem('timeline-current', JSON.stringify({}))
            navigate('/')
        }
    }
    
    return(
        <ul className='nav-ul'>
            <li className='nav-li'>
               <Link to='/' className='nav-link'>Home</Link>
            </li>
            <li className='nav-li'>
               <Link onClick={e => handleClick(e)} to='/users' className='nav-link'>Users</Link>
            </li>
            <li className='nav-li'>
               <Link onClick={e => handleClick(e)} to='/resources' className='nav-link'>Resources</Link>
            </li>
            <li className='nav-li'>
               <p onClick={e => handleClick(e)} className='nav-link' data-char='login' >{Object.keys(current_user).length === 0? 'Login': `Logout(${current_user.username})`}</p>
            </li>
        </ul>
    )
}

export default Navbar