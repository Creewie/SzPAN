import fs from 'fs'
import promises from "fs/promises"
import http from 'http'

const port = 3000;

const server = http.createServer((req,res)=>{

    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = url.searchParams.get('file');
    const headers = { "Content-Type": "text/plain; charset=utf-8" };
    const errorHead = { "Content-Type": "text/plain; charset=utf-8" };
    // const queryParams = Object.fromEntries(myURL.searchParams.entries())

    if (!filePath) {
        res.writeHead(400, errorHead);
        res.write(JSON.stringify({ code: 400, error: "Nie przekazano parametru file w url." }));
        res.end();
        return;
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404, errorHead);
        res.write(JSON.stringify({ code: 404, error: "Podany plik nie istnieje. Pamiętaj o dodaniu ./ w ścieżce relatywnej!" }));
        res.end();
        return;
    }

    const reader = fs.createReadStream(filePath);
    res.writeHead(200, headers);
    reader.pipe(res);

});

server.listen(port, () => {
    console.log(`Server na localhost:${port}`)
});