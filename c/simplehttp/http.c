#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <arpa/inet.h>
    



void http_handler(int client_fd, struct sockaddr_in *client_addr) {


    char buffer[4096];
    ssize_t bytes_read = read(client_fd, buffer, sizeof(buffer) - 1);

    if (bytes_read < 0) {
        perror("read");
        return;
    }

    buffer[bytes_read] = '\0'; // Null-terminate for safe printing
    printf("---- HTTP REQUEST BEGIN ----\n");
    printf("%s", buffer);
    printf("----  HTTP REQUEST END  ----\n");

    const char *response =
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/plain\r\n"
        "Content-Length: 22\r\n"
        "\r\n"
        "<h1>Hello, world!</h1>";

    ssize_t written = write(client_fd, response, strlen(response));
    if (written < 0) {
        perror("write");
    }



}
