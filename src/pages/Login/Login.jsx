import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { verifyUser } from '../data/users';

function Login({ setToken, setRole }) {

    const userRef = useRef()
    const passRef = useRef()

    return (
        <div className='login-container'>
            <Form.Label htmlFor="username">UserName</Form.Label>
            <Form.Control
                type="text"
                id="username"
                placeholder='user'
                style={{ textAlign: 'center' }}
                ref={userRef}
            />
            <Form.Label htmlFor="pass">PassWord</Form.Label>
            <Form.Control
                type="password"
                id="pass"
                placeholder='pass'
                style={{ textAlign: 'center' }}
                ref={passRef}
            />
            <button className='btn btn-success mt-4 ' onClick={() => {
                const user = userRef.current.value.trim()
                const pass = passRef.current.value.trim()
                userRef.current.value = ''
                passRef.current.value = ''
                const userInfo = verifyUser(user, pass)


                if (userInfo === null) {
                    alert('None')
                    userRef.current.focus()
                } else {
                    setToken(userInfo.token)
                    setRole(userInfo.role)
                }

            }}>Login</button>
        </div>
    )
}

export default Login;