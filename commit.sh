
GREENCOLOR="\033[32m"
REDCOLOR="\033[31m"
NONECOLOR="\033[m"

assert_continue () {
    printf "$1 [yn] "
    old_stty_cfg=$(stty -g)
    stty raw -echo ; answer=$(head -c 1) 
    stty $old_stty_cfg # restore stty configuration
    case $answer in
        [^yY] )
            printf "\n"
            exit 1
            ;;
    esac
    printf "\n"
    printf "\n"
}

################################################################################

staged_files="$(git status -s | grep -e "^[A-Z]" | awk '{print $2}')"
if [[ $staged_files = "" ]]; then
    echo "Nothing added to commit"
    exit
fi
echo "You have git added the following files:"
printf "$REDCOLOR$staged_files$NONECOLOR\n"
assert_continue "Are these the files you want to commit?"


result="$(grep -l $'\t' $staged_files)"
if [[ $result != "" ]]; then
    echo "The following files contain unexpanded tabs..."
    printf "$REDCOLOR$result$NONECOLOR\n"
    echo "Please remove unexpanded tabs and commit again"
    exit 1
fi


result="$(grep --color -in 'todo' $staged_files)"
if [[ $result != "" ]]; then
    echo "Checking TODO flags..."
    grep --color -in 'todo' $staged_files
    assert_continue "Are you sure you want to keep all these flags?"
fi


html_files="$(echo $staged_files | tr " " "\n" | grep "html")"
if [[ $html_files != "" ]]; then
    echo "Checking modified HTML files..."
    printf "$REDCOLOR$html_files$NONECOLOR\n"
    assert_continue "Have you run the validator against them?"
fi


assert_continue "Have you tested your pages?"

echo "Committing..."
if [[ $# -eq 1 ]]; then
    git commit -m "$1"
else
    git commit
fi
