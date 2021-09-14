#!/usr/bin/env node

const http = require("http");

const uri = "http://localhost:5000";

http
    .createServer(function (request, response) {
        const proxy = http.request(uri);
        proxy.on("response", function (proxyResponse) {
            proxyResponse.pipe(response);
        });
        request.pipe(proxy);
    })
    .listen(8080);
