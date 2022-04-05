import { near_police } from "./controller/shortcut.js"
import path from "path"
import { fileURLToPath } from 'url';
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csv = path.join(__dirname + "/police/latitude2csv.csv");
// let locate = [35.1388034, 129.105874]

// const result = await near_police(csv ,locate);
// console.log(result);

const script = async() => {
    const py = spawn('python', ['test.py'])

    py.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        data = data.toString().slice(1, -1).split(",")
        if (data[0] == 1) {
            console.log('catch')
            data = data.map(function (x, i) {
                return i == 0 ? x : parseFloat(x)
            })
            data = data.slice(1)
            var result = near_police(csv, data);
            result.then(r => console.log(r))
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