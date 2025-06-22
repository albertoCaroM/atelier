# function for logging command success/failure

the purpose of the script is to run commands(e.g., inside a for loop), and detect which ones fail.


The function redirects both standard and error output to /dev/null.
If the command executes succesfully it prints a success mesage in green.
If thecommans fails, it prints and error message in red, and apppends it to the log file log.error.

# example of ussage

``` bash
source try.sh
for i in *.zip
do
    try unzip -t "$i"
done



```
