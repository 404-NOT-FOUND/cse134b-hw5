
// parse argument passed in the dirty addr
parseArgs = function () {
    // location.search => the search string ('?xxx=xxx')
    var parameters = location.search.substring(1);
    if (parameters === '') {
        return {};
    }
    parameters = parameters.split('&');
    var args = {};
    for (parameter of parameters) {
        var pair = parameter.split('=');
        args[pair[0]] = unescape(pair[1]);
    }
    return args;
}

