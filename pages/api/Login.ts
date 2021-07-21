import { NextDatas, SECRETHASH } from '../variable/variable'
import knex from 'knex'
import jwt from 'jsonwebtoken'
import { sha3_512 } from 'js-sha3'

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

export default async function Home_API (req: NextDatas[0], res: NextDatas[1]) {
  const { username, Password } = JSON.parse(req.body)
  const [user] = await db.select('*').from('users').where('username', username)
  if (user && username == user.username && user.password == ""+sha3_512(user.salt+Password)){
    return res.send({ success: true, token: jwt.sign({ username }, SECRETHASH, { expiresIn: '2h' })})
  }else {
    return res.send({ success: false, msg: "비밀번호 혹은 아이디가 틀렸습니다."})
  }
}