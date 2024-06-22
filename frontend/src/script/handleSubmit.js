export const submitData = async (url, method, data) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
        credentials: "include" // Required for cookies
    });
    const responseData = await response.text();
    return responseData;
};