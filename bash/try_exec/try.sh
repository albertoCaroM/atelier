# # function for logging command success/failure
# 
# the purpose of the script is to run commands(e.g., inside a for loop), and detect which ones fail.
# 
# 
# The function redirects both standard and error output to /dev/null.
# If the command executes succesfully it prints a success mesage in green.
# If thecommans fails, it prints and error message in red, and apppends it to the log file log.error.
# 
# # example of ussage
# 
# ``` bash
# source try.sh
# for i in *.zip
# do
#     try unzip -t "$i"
# done

`


try() {
  "$@" > /dev/null 2>&1 
  local exit_code=$?

  if [ $exit_code -eq 0 ]; then
    echo -e "\033[0;32m✔️  Éxito: '$*'\033[0m"
  else
    echo -e "\033[0;31m❌ Error: '$*' falló (código $exit_code)\033[0m" 
    echo -e "❌ Error: '$*' falló (código $exit_code)"  >> log.error 
  fi

  return $exit_code
}

