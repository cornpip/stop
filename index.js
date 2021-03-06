import { near_police } from "./track/shortcut.js"
import { req_sms } from "./sms/send.js"
import path from "path"
import { fileURLToPath } from 'url';
import { spawn } from 'child_process'
import dotenv from 'dotenv'
dotenv.config()
// dotenv는 최종 process 실행 파일에서만 필요함
// 거기 설정 기준으로 process.env 값들이 설정된다.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csv = path.join(__dirname + "/police/latitude2csv.csv");
// let locate = [35.1388034, 129.105874]

// const result = await near_police(csv ,locate);
// console.log(result);

const script = async() => {
    const py = spawn('python', ['./pyprocess/client.py'])

    py.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        // data처리
        // buffer => toString [1, 2, 3] string => slice 1,2,3 => split [1, 2, 3] array => 요소 map float로 변경
        data = data.toString()
        data = data.slice(1, -1).split(",")
        if (data[0] === "1") {
            console.log('catch')
            data = data.map(function (x, i) {
                return i == 0 ? x : parseFloat(x)
            })
            data = data.slice(1);
            var result = near_police(csv, data);

            // result promise다
            result.then(r => {
                // r[0]=도로명, r[1]=지번, data[0]=위도, data[1]=경도
                var msg = `가까운 파출소: ${r[0]}, 문제위치: 위도(${data[0]}), 경도(${data[1]})`
                console.log(msg,'\n');
                req_sms(msg);
            })
        }
    });

    py.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    py.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

script()