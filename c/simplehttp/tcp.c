#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>       // close()
#include <arpa/inet.h>    // sockaddr_in, inet_ntoa()
#include <sys/socket.h>   // socket(), bind(), listen(), accept()
#include "tcp.h"

int run_tcp_server(const int port, connection_handler_t handler)
{
  int server_fd, client_fd;
  struct sockaddr_in server_addr, client_addr;
  socklen_t client_len = sizeof(client_addr);



  // create socker
  server_fd = socket(AF_INET, SOCK_STREAM, 0);
  if (server_fd < 0) {
    perror("socket");
    exit(EXIT_FAILURE);
  } 

  // bind to port
  server_addr.sin_family = AF_INET;
  server_addr.sin_addr.s_addr = INADDR_ANY; // 0.0.0.0
  server_addr.sin_port = htons(port);       // host to network byte order

  if (0 > bind(server_fd, (struct sockaddr*)&server_addr, sizeof(server_addr)) ) {
    perror("bind");
    close(server_fd);
    exit(EXIT_FAILURE);
  }







  // listen to connections
  const int max_pending_connections=5;
  if (0 > listen(server_fd, max_pending_connections)) {
    perror("listen");
    close(server_fd);
    exit(EXIT_FAILURE);
  }

  printf("Server listening on port %d...\n", port);

  while (1) {
    int client_fd = accept(server_fd, (struct sockaddr*)&client_addr, &client_len);
    if (client_fd < 0) {
      perror("accept");
      continue;
    }

    pid_t pid = fork();
    if (pid < 0) {
      perror("fork");
      close(client_fd);
      continue;
    }

    if (pid == 0) {
      // Child process
      close(server_fd); // child doesn't need the listening socket
      handler(client_fd, &client_addr);
      close(client_fd);
      exit(0);
    } else {
      // Parent process
      close(client_fd); // parent doesn't use this socket
    }
  }

  return 0;
}
