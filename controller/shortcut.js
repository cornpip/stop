import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';

// input = [위도, 경도]
const near_police = async (path,input)=>{
    var data = readFileSync(path,'utf-8')
    data = data.split(/\r?\n/);
    data = data.map(x => x.split(','));
    var distance = 1e9
    var index = 0
    data.map(function(x, i){
        if (x[2] !== ""){
            var latitude = Math.abs(x[2] - input[0])
            var longtitude = Math.abs(x[3] - input[1])
            if ((latitude+longtitude) < distance){
                distance = (latitude + longtitude)
                index = i
            }
        }
    })
    // console.log(data[index])
    return data[index].slice(0,-1)
}

export {near_police}