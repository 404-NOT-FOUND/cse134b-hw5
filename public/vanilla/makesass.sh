
# makesass.sh

# add your .sass source files to the list
SRCS="sidebar.sass
      gameinfo.sass
      list.sass
      header.sass
      login.sass
      ratings.sass
     "

################################################################################

SASS_DIR="sass"
CSS_DIR="css"

# src_list=$(echo ${SRCS} | tr ";" "\n")
src_list=${SRCS}
cmd="sass --watch "
for src in ${src_list}; do
    cmd+=" ${SASS_DIR}/${src}:${CSS_DIR}/${src%.*}.css"
done
${cmd}
