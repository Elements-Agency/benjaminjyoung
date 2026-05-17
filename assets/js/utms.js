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

    localStorage.setItem('utm_date', new Date().toISOString());
}

// Build UTM URL from localStorage
function buildUTMUrl(baseUrl) {
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_date'];
    const params = new URLSearchParams();

    utmParams.forEach(param => {
        const value = localStorage.getItem(param);
        if (value) {
            params.append(param, value);
        }
    });

    const [baseUrlPart, hash] = baseUrl.split('#');    
    return params.toString() ? `${baseUrlPart}?${params.toString()}${hash ? '#' + hash : ''}` : baseUrl;
}