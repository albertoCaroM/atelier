# Simple HTTP Server in C

This directory contains a minimal HTTP server implementation written in C. The project demonstrates basic TCP networking and HTTP protocol handling.

## Files

- `server.c`: Main server logic. Handles incoming connections and HTTP requests.
- `tcp.c` / `tcp.h`: TCP socket abstraction and helper functions.
- `http.c` / `http.h`: HTTP protocol parsing and response utilities.
- `Makefile`: Build instructions for compiling the server.

## Features

- Listens for incoming HTTP requests on a specified port.
- Parses basic HTTP GET requests.
- Sends simple HTTP responses.
- Modular code structure for easy extension.

## Build Instructions

1. Open a terminal in this directory.
2. Run `make` to compile the server.

```
make
```

This will produce an executable (e.g., `server`).

## Usage

Run the server with:

```
./server <port>
```

Replace `<port>` with the desired port number (e.g., `8080`).

## Notes

- This server is for educational and demonstration purposes. It is not production-ready.
- Only basic HTTP/1.0 or HTTP/1.1 GET requests are supported.
