import { createSlice } from '@reduxjs/toolkit'

let initial = null
try{
    initial = JSON.parse(localStorage.getItem('timeline-users'))
}catch(err){
    console.error(err, ' Error occurred')
}
initial = initial?initial:[]

export const usersSlice = createSlice({
    name: 'users',
    initialState: { value: Object.keys(initial).length === 0?[]:initial},
    reducers: {
        login: (state, action) => {
            //auth
            const {username, password} = action.payload
            if(username.trim().length === 0 || password.trim().length === 0){
                console.error('Please enter valid credentials')
            }
            else{
                const _user = state.value.filter(v => v.password === password && v.username === username)
                if(_user.length === 1){
                    console.log('logged in as: ', _user)
                    localStorage.setItem('timeline-current', JSON.stringify(action.payload))
                }
                else if(_user.length === 0) console.error('no user found')
            }
        },
        register: (state, action) => {
            //auth
            const {username, password} = action.payload
            if(username.trim().length === 0 || password.trim().length === 0){
                console.error('Please enter valid credentials')
            }
            else{
                const _user = state.value.filter(v => v.username === username)
                if(_user.length !==0) console.error('User already exists')
                else{
                    console.log('Registered successfully')
                    state.value.push(action.payload)
                    localStorage.setItem('timeline-users', JSON.stringify(state.value))
                    localStorage.setItem('timeline-current', JSON.stringify(action.payload))
                }
            }
        }
    }
})

export const { login, register } = usersSlice.actions
export default usersSlice.reducer