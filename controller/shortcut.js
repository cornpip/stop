import {readFile} from 'fs';

readFile('../police/latitude2csv.csv', 'utf-8', function(err,data){
    var data = data.split(/\r?\n/);
    data = data.map(x => x.split(','))
    console.log(data)
})