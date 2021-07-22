import Head from '../components/head'
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

const preventDefault = (f: any) => (e: any) => {
    e.preventDefault()
    f(e)
}

export default function Home() {
    const router = useRouter()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const QueryhandleParam = (setValue: any) => (e: any) => setValue(e.target.value)
    const login = preventDefault(async () => {
        const res = await fetch('/api/Login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
      }),
      }).then((res) => res.json())
        document.cookie = 'Token' + '=' + ''
        console.log(res)
        if (!res.success) return alert('실패')
        if(res.success){
            document.cookie = 'Token=' + res.token
            router.push("/user")
        }
    })
    return (
    <body style={{height: '100%', textAlign: 'center', marginTop: '80px'}}>
        <Head/>
        <div style={{textAlign: 'center'}}>
            <h1 style={{textAlign: 'center', color: 'white', fontWeight: 600, marginBottom: '40px'}}>로그인</h1>
            <form onSubmit={login} method="POST">
              <input type="text" className="TextInput1" onChange={QueryhandleParam(setusername)} placeholder="username"/><br/>
              <input type="password" className="TextInput1" onChange={QueryhandleParam(setpassword)}placeholder="password"/><br/>
              <Button style={{marginTop: '20px', marginRight: '15px'}} className="Button2" variant="primary" type="submit">로그인</Button>
              <Link href="/register"><Button style={{marginTop: '20px'}} className="Button2" variant="primary" type="button">회원가입</Button></Link>
            </form>
        </div>
      </body>
  )
}
