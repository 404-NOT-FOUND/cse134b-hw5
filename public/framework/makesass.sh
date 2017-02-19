
# makesass.sh

# add your .sass source files to the list

SRCS="header.sass
	  login.sass
      sidebar.sass
      list.sass
      ratings.sass
      recommend-list.sass
      master.sass
     "

################################################################################

watch=1
if [ $# -eq 1 ]; then
    if [ $1 = "--no-watch" ] || [ $1 = "-n" ]; then
        watch=0
    fi
fi

SASS_DIR="sass"
CSS_DIR="css"

mkdir -p ${CSS_DIR}

src_list=${SRCS}
cmd="sass"
if [ ${watch} -eq 1 ]; then
    cmd+=" --watch"
fi
for src in ${src_list}; do
    cmd+=" ${SASS_DIR}/${src}:${CSS_DIR}/${src%.*}.css"
done
${cmd}
