#!/usr/bin/env node

// With HTTP Basic Auth:

// HTTP module
const http = require("http");

// Authentication module.
const auth = require("http-auth");
const basic = auth.basic({
    realm: "test-ls-user",
    file: __dirname + "/../data/htpasswd" // gevorg:gpass, Sarah:testpass
});

const uri = "http://<IP>:3000";

http
    .createServer(basic.check(function (request, response) {
        const proxy = http.request(uri);
        proxy.on("response", function (proxyResponse) {
            proxyResponse.pipe(response);
        });
        request.pipe(proxy);
    }))
    .listen(80);

// Without HTTP Basic Auth:

// #!/usr/bin/env node
//
// // HTTP module
// const http = require("http");
//
// const uri = "http://<IP>:3000";
//
// http
//     .createServer(function (request, response) {
//         const proxy = http.request(uri);
//         proxy.on("response", function (proxyResponse) {
//             proxyResponse.pipe(response);
//         });
//         request.pipe(proxy);
//     })
//     .listen(80);
