import knex from 'knex'
import jwt from 'jsonwebtoken'
import { NextDatas, SECRETHASH, TokenData } from '../variable/variable'

const DBConfig = {
    host:'127.0.0.1', // 아이피 (IP)
    port: 3306, // 포트 3306 (포트 3306 열어줘야함)
    user: 'localhost', // user의 이름 (username)
    database : 'database' // database 이름 (Data Base Name)
}

const db = knex({
    client: 'mysql',
    connection: DBConfig
})

export default async function Auth_API (req: NextDatas[0], res: NextDatas[1]) {
    const { Token } = req.cookies
    const checktoken = jwt.verify(Token, SECRETHASH) as TokenData
    if (!checktoken) return
    const [user] = await db.select('*').from('users').where('username', checktoken.username)
    if (user) return res.send({ success: true, username: checktoken.username, msg: ""})
    else return res.send({ success: false, username: '',  msg: "로그인 세션이 만료되었거나 에러가 발생 하였습니다."})
}