#ifndef TCP_SERVER_H
#define TCP_SERVER_H

#include <netinet/in.h> 

typedef void (*connection_handler_t)(int client_fd, struct sockaddr_in *client_addr);

int run_tcp_server(const int port, connection_handler_t handler);

#endif // TCP_SERVER_H

