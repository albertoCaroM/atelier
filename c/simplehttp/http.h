#ifndef HTTP_H
#define HTTP_H
#include <netinet/in.h> // for struct sockaddr_in


void http_handler(int client_fd, struct sockaddr_in *client_addr);

#endif // HTTP_H

