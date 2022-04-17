import { useEffect, useState } from 'react'
import './usersStyles.css'

function Resources()
{
    const [resources, setResources] = useState([])
    const [page, setPage] = useState({
        current: 1,
        total: []
    })
    
    
    const API_URL = `https://reqres.in/api/unknown?page=${page.current}`
    async function fetchData(url = API_URL)
    {
        fetch(url)
            .then(res => res.json())
            .then (data =>{
                setResources(data.data)
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
    }, [page])
    const handlePageClick = e => {
        console.log('clicked')
        const _navigate_to = e.target.dataset.page
        const _url = `https://reqres.in/api/unknown?page=${_navigate_to}`
        fetchData(_url)
    }
    return(
        <>
            <div className='users-container'>
                {resources.length === 0?(
                    <p className='no-users-msg'>Looking up users...</p>
                ):(
                    resources.map((r, _in) => {
                        const { name, year, color, pantone_value, id} = r
                        return(
                            <div className='user-card' key={id}>
                                <p>{ name }</p>
                                <p>{ year }</p>
                                <div className='res-color' style={{'background':`${color}`}}>{ name } { color }</div>
                                <p>{ pantone_value }</p>
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
    )
}

export default Resources