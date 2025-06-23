#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>
#include "tcp.h"
#include "http.h"

void show_help(const char *app_name) {
    printf("Usage: %s [options] [arguments...]\n",app_name);
    printf("Options:\n");
    printf("  -p, --port <number>   Tcp port (0-65535)\n");
    printf("  -h, --help            Show this help message\n");
}

int main(int argc, char *argv[]) {
    int opt;
    int port = 8080; //default port

    static struct option long_options[] = {
        {"help",    no_argument,       0, 'h'},
        {"port",    required_argument, 0, 'p'},

        {0, 0, 0, 0}
    };

    while ((opt = getopt_long(argc, argv, "p:h", long_options, NULL)) != -1) {
        switch (opt) {
            case 'p':
                port = atoi(optarg);
                if (port < 0 || port > 65535) {
                    fprintf(stderr, "Error:  Port must be between 0 and  65535\n");
                    return 1;
                }
                break;
            case 'h':
                show_help(argv[0]);
                return 0;
            case '?':
                return 1;
        }
    }
 
   return run_tcp_server(port,http_handler);
}

