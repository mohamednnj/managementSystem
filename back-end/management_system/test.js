function addOrChangeUrlParameter (url, param) {
    const [baseUrl, queryString] = url.split('?');
    const params = new URLSearchParams(queryString || '');
    const [key, value] = param.split('=');
    params.set(key, value);
    const newQueryString = params.toString();
    return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
}

console.log(addOrChangeUrlParameter("www.example.com", "key=value"))
// -> 'www.example.com?key=value' (adds a parameter).

console.log(addOrChangeUrlParameter("www.example.com?key=value", "key2=value2" ))
// -> 'www.example.com?key=value&key2=value2' (adds another parameter).

console.log(addOrChangeUrlParameter("www.example.com?key=oldValue`", "key=newValue" ))
// ->'www.example.com?key=newValue' (changes the parameter).