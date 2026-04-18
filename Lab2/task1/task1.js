const http = require('http');

const PORT = 3000;

const VALID_TOKEN = "BearerekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM";

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader === VALID_TOKEN) {
        // Якщо authHeader є і він правильний
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Access granted');
    } else {
        // Якщо authHeader відсутній або неправильний
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
