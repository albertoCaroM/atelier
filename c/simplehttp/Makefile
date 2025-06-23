TARGET=http_server
objects = server.o http.o tcp.o

all: $(objects)
	$(CC) $^ -o ${TARGET}

$(objects): %.o: %.c
	$(CC) -c $^ -o $@


clean:
	rm -f *.o  ${TARGET}


