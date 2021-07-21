import jwt  from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
export type NextDatas = [NextApiRequest, NextApiResponse]

export const SECRETHASH = "CD693A717D8C28941148E997F1FEADDAED514A8F812EE4A4DFD0742CA65D8C47F20585CAA5287E55694F1C0D929D3FAD"

export interface TokenData {
    username: string
}