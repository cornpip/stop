import { make_sig } from './signature.js'
import https from 'https'
// http 쓰면 거절되고 https써야되네

var req_sms = (msg)=>{
    var timestamp = `${Date.now()}`
    var from_num = process.env.FROM_NUM
    var to_num = process.env.TO_NUM

    const postData = JSON.stringify({
        'type': 'SMS',
        'countryCode': '82',
        'from': from_num,
        'contentType': 'COMM',
        'content': `${msg}`,
        'messages': [
            {'to': to_num }
        ]
    });
    console.log(`postData: `,postData)
    
    const options = {
        hostname: "sens.apigw.ntruss.com",
        path: `/sms/v2/services/${process.env.SERVICE_ID}/messages`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key" :`${process.env.ACCESS_KEY}`,
          "x-ncp-apigw-signature-v2": make_sig(timestamp),
        }
    };
    console.log(`options: `,options);
    
    const req = https.request(options, (res)=>{
        console.log(res.statusCode,res.statusMessage);
    })

    req.on('err',(e)=>{
        console.log(e.messages);
    })
    
    req.write(postData)
    req.end()
}

// var aa = [
//     '부산광역시 남구 수영로 328',
//     '부산광역시 남구 대연동 54-4',
//     '35.1378436249',
//     '129.1019831109'
//   ]
// console.log(`${aa}`)
// req_sms(aa)
export {req_sms}