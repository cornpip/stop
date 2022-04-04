import {readFile, writeFile} from 'fs';

readFile('../police/latitudecsv.csv', 'utf-8', function(err,data){
    var data = data.split(/\r?\n/);
    data = data.map(x => x.split(','))
    data = data.map(function(x, i){
        if (i == data.length-1){
            return
        }
        if (x[4].includes("변환실패")){
            var road = x[0].split(' ')
            if (road[road.length-1].match(/파출소|지구대/)){
                x[0] = road.slice(0,-1)
                x[0] = x[0].join(" ")
                return x
            }
        }
        return x
    })
    // console.log(data)

    // data = data.join('\n')
    // writeFile('test.csv', "\uFEFF"+data, (err)=>{
    //     console.log(err)
    // })
})

// const test_data = [
//     '서울특별시 동작구 사당로17나길 4,서울특별시 동작구 사당동 257-25,37.4841180387,126.9732554446,변환완료(지번주소업데이트;위도업데이트;경도업데이트;)\r',
//     '서울특별시 동작구 노량진로 248,서울특별시 동작구 본동 150-1,37.5124023060,126.9536371224,변환완료(지번주소업데이트;위도업데이트;경도업데이트;)\r'
// ]

// const test_data2 = test_data.join('\n')
// writeFile('test.csv', "\uFEFF"+test_data2, (err)=>{
//     console.log(err)
// })

// readFile('test.csv', 'utf-8', function(err,data){
//     var data = data.split(/\r?\n/);
//     console.log(data)
// })