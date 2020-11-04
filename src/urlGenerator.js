const randomString = () => {
    console.log('random string called');
    var result = '';
    var len = 5
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export default randomString;
