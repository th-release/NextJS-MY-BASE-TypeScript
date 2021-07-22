import { NextDatas, SECRETHASH } from '../variable/variable'
import knex from 'knex'
import { sha3_256, sha3_512 } from 'js-sha3'

const DBConfig = {
    host:'th-release.kro.kr', // 아이피 (IP)
    port: 3306, // 포트 3306 (포트 3306 열어줘야함)
    user: 'cth', // user의 이름 (username)
    database : 'HackingTest' // database 이름 (Data Base Name)
  }

const db = knex({
    client: 'mysql',
    connection: DBConfig
})

export default async function AuthAPI (req: NextDatas[0], res: NextDatas[1]) {
    const { username, password, CheckPassword } = JSON.parse(req.body)
    let salt = ""
    for(let i = 1; i <= 20; i++){
        salt += String.fromCharCode(Math.random() * (90 - 48) + 90)
    }
    const Password = sha3_256(salt+password)
    console.log("user:" + salt + "\n" + password +"\n" + Password)
    const [user] = await db.select('*').from('users').where('username', username)
    if (!user && password == CheckPassword){
        console.log("s")
        await db.insert({ username, password: Password, salt }).into('users')
        return res.send({ success: true })
    }
    return res.send({ success: false, msg: "아이디가 일치 하는 사람이 있거나 비밀번호가 일치 하지 않습니다."})
}