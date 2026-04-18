const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {

        const results = [];
        let headers = [];

        fs.createReadStream('Lab2/task2/data.csv')
            .pipe(split2())
            .pipe(through2.obj(function (line, enc, callback) {

                if (!line.trim()) return callback();

                const values = line.split(',');

                if (headers.length === 0) {
                    headers = values;
                } else {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index];
                    });
                    results.push(obj);
                }

                callback();
            }))
            .on('finish', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results, null, 2));
            })
            .on('error', (err) => {
                res.writeHead(500);
                res.end('Server error');
                console.error(err);
            });

    } else {
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
