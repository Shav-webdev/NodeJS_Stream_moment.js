const {Writable, Readable, Transform} = require("stream");
const fs = require("fs");
const moment = require("moment");

/**
 * @method_read of @class MyReadableStream push to stream current time in every second*/

class MyReadableStream extends Readable {
    constructor() {
        super();
        this.counter = 0;
    }

    _read() {
        setTimeout(() => {
            if (this.counter < 150) {
                this.push(`${this.counter}. ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
                ++this.counter;
            }
        }, 1000)
    }
}

/**
 * @method_transform of @class MyTransformStream added Yerevan time zone to chunk*/

class MyTransformStream extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(`Time in Yerevan is now  ${chunk} \n`, "utf8");
        callback();
    }
}

/**
 * @method_write of @class MyWriteableStream write to the file **/

class MyWriteableStream extends Writable {
    constructor() {
        super();
        this.counter = 0;
        this.writeStream = fs.createWriteStream("./text.txt", "utf8")
    }

    _write(chunk, encoding, next) {
        this.writeStream.write(
            ` ${chunk} `,
            "utf8",
            function (err) {
                if (err) {
                    console.log(err.message);
                }
            });
        next();
    }
}

const rs = new MyReadableStream();
const ws = new MyWriteableStream();
const ts = new MyTransformStream();

rs.pipe(ts).pipe(ws);

