import { useEffect, useState } from 'react'
import './usersStyles.css'

function Users()
{
    const current_user = JSON.parse(localStorage.getItem('timeline-current'))
    const [users, setUsers] = useState([])
    const [page, setPage] = useState({
        current: 1,
        total: []
    })
    
    
    const API_URL = `https://reqres.in/api/users?page=${page.current}`
    async function fetchData(url = API_URL)
    {
        fetch(url)
            .then(res => res.json())
            .then (data =>{
                console.log(data)
                setUsers(data.data)
                let _pages = []
                for(let i=0; i<data.total_pages; i++) _pages.push(i+1)
                setPage({
                    current: data.page,
                    total: _pages
                })
            })
            .catch(err =>{
                throw new Error(`Error Occurred: ${err}`)
            })
        
    }
    useEffect(()=>{
        fetchData()
    }, [])
    useEffect(()=>{
        const msg = document.querySelector('.no-users-msg')
        setTimeout(()=>{
            // msg.textContent = 'Nothing to show here'
        }, 1)
        return () => {}
    }, [page])
    const handlePageClick = e => {
        const _navigate_to = e.target.dataset.page
        console.log('clicked', _navigate_to)
        const _url = `https://reqres.in/api/users?page=${_navigate_to}`
        fetchData(_url)
    }
    return(
        <>
            {Object.keys(current_user).length === 0?(null):(
            <>
                <div className='users-container'>
                    {users.length === 0?(
                        <p className='no-users-msg'>Looking up users...</p>
                    ):(
                        users.map((u, _in) => {
                            const { avatar, email, first_name, last_name, id} = u
                            return(
                                <div className='user-card' key={id}>
                                    <img src={avatar} alt='Avatar' />
                                    <p>{ first_name } { last_name }</p>
                                    <p>{ email }</p>
                                </div>
                            )
                        })
                    )}
                </div>
                <div className='pagination-container'>
                    {page.total.length !== 0?(
                        <div className='pagination'>{page.total.map((p,_in) => {
                            return <div className='page-no' key={_in} data-page={p} onClick={e => handlePageClick(e)}>{p}</div>})}</div>
                    ):(null)}
                </div>
            </>
        )}
        </>
    )
}

export default Users