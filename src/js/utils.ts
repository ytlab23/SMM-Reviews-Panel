import edjsHTML from 'editorjs-html';
export function isAdminLoggedIn(param_cookie: any) {
    if (param_cookie == undefined || param_cookie == "")
        return false
    else
        return true;
}

export function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
}

export function removeHTMLTags(str: string) {
    // Regular expression to match HTML tags
    const regex = /<\/?[^>]+(>|$)/g;
    // Replace matched HTML tags with an empty string
    return str.replace(regex, "");
}

export function JSONConvertToHTML(JSONStringParameter : string) {
    const JSONString = JSON.stringify({
        blocks: JSON.parse(JSONStringParameter)
      });
    const edjsParser = edjsHTML();
    // Parse the JSON string to get an object (if it is not already parsed)
    const parsedJSON = JSON.parse(JSONString);
    const html = edjsParser.parse(parsedJSON);  // Pass the parsed object
    return html.join("");
}

export function timeDifference(dateTime: string | Date): string {
    const inputTime = new Date(dateTime);
    const currentTime = new Date();

    const diffInMs = currentTime.getTime() - inputTime.getTime();
    const diffInMin = Math.floor(diffInMs / 1000 / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 2) {
        return "NA";
    }

    if (diffInDays > 0) {
        return diffInDays === 1 ? "1 Day" : `${diffInDays} Days`;
    }

    if (diffInHours > 0) {
        const remainingMinutes = diffInMin % 60;
        return remainingMinutes > 0
            ? `${diffInHours} Hr${diffInHours > 1 ? 's' : ''}, ${remainingMinutes} Min`
            : `${diffInHours} Hr${diffInHours > 1 ? 's' : ''}`;
    }

    return `${diffInMin} Min`;
}

export function optimizeImageUrl(url:string, height = 100, format = 'webp') {
    // Split the URL at the last slash to separate the base URL from the image identifier
    const baseUrl = url.substring(0, url.lastIndexOf('/'));
    const imageId = url.substring(url.lastIndexOf('/') + 1);
    
    // Construct the optimized URL
    const optimizedUrl = `${baseUrl}/transform/height=${height},format=${format}/${imageId}`;
    
    return optimizedUrl;
}

export function getAPIPath() {
    let siteIs = "https://smm-admin-panel.vercel.app/";
    return siteIs
}
// Example usage:
//   console.log(timeDifference('2024-07-01T10:00:00')); // Adjust the date and time as needed
