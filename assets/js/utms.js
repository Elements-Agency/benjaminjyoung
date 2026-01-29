// Store UTM data in localStorage
function storeUTMData() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            localStorage.setItem(param, value);
        }
    });
}

// Build UTM URL from localStorage
function buildUTMUrl(baseUrl) {
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const params = new URLSearchParams();

    utmParams.forEach(param => {
        const value = localStorage.getItem(param);
        if (value) {
            params.append(param, value);
        }
    });

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.viewhome = true;

    // Call the function to store UTM data
    storeUTMData();

    const shopUtmUrl = buildUTMUrl('/shop/');

    // replace any hrefs to /shop/, /artwork/, or /story/ with UTM version
    document.querySelectorAll('a[href*="/shop/"], a[href*="/artwork/"], a[href*="/story/"]').forEach(link => {
        link.href = buildUTMUrl(link.href);
    });
});