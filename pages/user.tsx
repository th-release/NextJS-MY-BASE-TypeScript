import Head from '../components/head'
import fetcher from '../utils/fetcher'
import useSWR from 'swr'
export default function Home() {
    const { data, error } = useSWR("/api/verify", fetcher)
    if(error) { 
        return(
            <body style={{height: '100%', textAlign: 'center', marginTop: '80px', color: 'white'}}>
                <Head/>
                <h1>에러</h1>
            </body>
        )
    }
    if (!data){
        return (
            <body style={{height: '100%', textAlign: 'center', marginTop: '80px', color: 'white'}}>
                <Head/>
                <h1>로딩 중 ...</h1>
            </body>
        )
    }else {
        return (
            <body style={{height: '100%', textAlign: 'center', marginTop: '80px', color: 'white'}}>
                <Head/>
                <h1>{data.username}</h1>
                <h1>인증완료</h1>
            </body>
        )
    }
}
