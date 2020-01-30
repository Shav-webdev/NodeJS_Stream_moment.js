const {Writable} = require("stream");
const fs = require("fs");
const moment = require("moment");

/**
 * @method _write of @class MyWritableStream write to a stream every second
 * the current time formatted using moment.js and write that stream to the file*/

class MyWritableStream extends Writable {
    constructor(sPath) {
        super();
        this.wStream = fs.createWriteStream(`${sPath}`);
        this.counter = 0;
    }
    _write(chunk, enc, next) {
        if (chunk.length === 0) {
            next(new Error('empty chunk detected'));
        } else {
            setInterval(() => {
                ++this.counter;
                this.wStream.write(`${this.counter}: ${chunk} ${moment().format('MMMM Do YYYY, h:mm:ss a')} \n`);
            }, 1000);
        }
        next();
    }
}

const ws = new MyWritableStream("./text.txt");


ws._write("now", "utf8", function (err) {
    if (err){
        console.log("err", err.message);
    }
});

fs.createReadStream("./text.txt", "utf8").pipe(ws);




