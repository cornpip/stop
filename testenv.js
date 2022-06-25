import {make_sig} from "./sms/signature.js"
import { req_sms } from "./sms/send.js"
import dotenv from 'dotenv'
dotenv.config()

var c = make_sig(`1656155489879`)
console.log(c)

var d = req_sms("aaaa")