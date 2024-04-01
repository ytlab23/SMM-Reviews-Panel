function isAdminLoggedIn(param_cookie :any) {
    if(param_cookie == undefined || param_cookie == "")
        return false
    else
        return true;
}

export {isAdminLoggedIn};