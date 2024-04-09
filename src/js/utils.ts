export function isAdminLoggedIn(param_cookie :any) {
    if(param_cookie == undefined || param_cookie == "")
        return false
    else
        return true;
}

export function formatDate(inputDate:string) {
    const date = new Date(inputDate);
    const options : Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
}
