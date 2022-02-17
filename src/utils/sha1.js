export function sha1(a) {
    function b(a, b) {
        var c, d, e, f, g;
        e = a & 2147483648;
        f = b & 2147483648;
        c = a & 1073741824;
        d = b & 1073741824;
        g = (a & 1073741823) + (b & 1073741823);
        return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
    }
    function c(a, c, d, e, f, g, h) {
        a = b(a, b(b(c & d | ~c & e, f), h));
        return b(a << g | a >>> 32 - g, c)
    }
    function d(a, c, d, e, f, g, h) {
        a = b(a, b(b(c & e | d & ~e, f), h));
        return b(a << g | a >>> 32 - g, c)
    }
    function e(a, c, d, e, f, g, h) {
        a = b(a, b(b(c ^ d ^ e, f), h));
        return b(a << g | a >>> 32 - g, c)
    }
    function f(a, c, d, e, f, g, h) {
        a = b(a, b(b(d ^ (c | ~e), f), h));
        return b(a << g | a >>> 32 - g, c)
    }
    function g(a) {
        var b = "", c = "", d;
        for (d = 0; d <= 3; d++)
            c = a >>> d * 8 & 255,
                c = "0" + c.toString(16),
                b += c.substr(c.length - 2, 2);
        return b
    }
    var h = [], p, r, q, o, l, j, m, n, a = function (a) {
        for (var a = a.replace(/\r\n/g, "\n"), b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            d < 128 ? b += String.fromCharCode(d) : (d > 127 && d < 2048 ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224),
                b += String.fromCharCode(d >> 6 & 63 | 128)),
                b += String.fromCharCode(d & 63 | 128))
        }
        return b
    }(a), h = function (a) {
        var b, c = a.length;
        b = c + 8;
        for (var d = ((b - b % 64) / 64 + 1) * 16, e = Array(d - 1), f = 0, g = 0; g < c;)
            b = (g - g % 4) / 4,
                f = g % 4 * 8,
                e[b] |= a.charCodeAt(g) << f,
                g++;
        e[(g - g % 4) / 4] |= 128 << g % 4 * 8;
        e[d - 2] = c << 3;
        e[d - 1] = c >>> 29;
        return e
    }(a);
    l = 1732584193;
    j = 4023233417;
    m = 2562383102;
    n = 271733878;
    for (a = 0; a < h.length; a += 16)
        p = l,
            r = j,
            q = m,
            o = n,
            l = c(l, j, m, n, h[a + 0], 7, 3614090360),
            n = c(n, l, j, m, h[a + 1], 12, 3905402710),
            m = c(m, n, l, j, h[a + 2], 17, 606105819),
            j = c(j, m, n, l, h[a + 3], 22, 3250441966),
            l = c(l, j, m, n, h[a + 4], 7, 4118548399),
            n = c(n, l, j, m, h[a + 5], 12, 1200080426),
            m = c(m, n, l, j, h[a + 6], 17, 2821735955),
            j = c(j, m, n, l, h[a + 7], 22, 4249261313),
            l = c(l, j, m, n, h[a + 8], 7, 1770035416),
            n = c(n, l, j, m, h[a + 9], 12, 2336552879),
            m = c(m, n, l, j, h[a + 10], 17, 4294925233),
            j = c(j, m, n, l, h[a + 11], 22, 2304563134),
            l = c(l, j, m, n, h[a + 12], 7, 1804603682),
            n = c(n, l, j, m, h[a + 13], 12, 4254626195),
            m = c(m, n, l, j, h[a + 14], 17, 2792965006),
            j = c(j, m, n, l, h[a + 15], 22, 1236535329),
            l = d(l, j, m, n, h[a + 1], 5, 4129170786),
            n = d(n, l, j, m, h[a + 6], 9, 3225465664),
            m = d(m, n, l, j, h[a + 11], 14, 643717713),
            j = d(j, m, n, l, h[a + 0], 20, 3921069994),
            l = d(l, j, m, n, h[a + 5], 5, 3593408605),
            n = d(n, l, j, m, h[a + 10], 9, 38016083),
            m = d(m, n, l, j, h[a + 15], 14, 3634488961),
            j = d(j, m, n, l, h[a + 4], 20, 3889429448),
            l = d(l, j, m, n, h[a + 9], 5, 568446438),
            n = d(n, l, j, m, h[a + 14], 9, 3275163606),
            m = d(m, n, l, j, h[a + 3], 14, 4107603335),
            j = d(j, m, n, l, h[a + 8], 20, 1163531501),
            l = d(l, j, m, n, h[a + 13], 5, 2850285829),
            n = d(n, l, j, m, h[a + 2], 9, 4243563512),
            m = d(m, n, l, j, h[a + 7], 14, 1735328473),
            j = d(j, m, n, l, h[a + 12], 20, 2368359562),
            l = e(l, j, m, n, h[a + 5], 4, 4294588738),
            n = e(n, l, j, m, h[a + 8], 11, 2272392833),
            m = e(m, n, l, j, h[a + 11], 16, 1839030562),
            j = e(j, m, n, l, h[a + 14], 23, 4259657740),
            l = e(l, j, m, n, h[a + 1], 4, 2763975236),
            n = e(n, l, j, m, h[a + 4], 11, 1272893353),
            m = e(m, n, l, j, h[a + 7], 16, 4139469664),
            j = e(j, m, n, l, h[a + 10], 23, 3200236656),
            l = e(l, j, m, n, h[a + 13], 4, 681279174),
            n = e(n, l, j, m, h[a + 0], 11, 3936430074),
            m = e(m, n, l, j, h[a + 3], 16, 3572445317),
            j = e(j, m, n, l, h[a + 6], 23, 76029189),
            l = e(l, j, m, n, h[a + 9], 4, 3654602809),
            n = e(n, l, j, m, h[a + 12], 11, 3873151461),
            m = e(m, n, l, j, h[a + 15], 16, 530742520),
            j = e(j, m, n, l, h[a + 2], 23, 3299628645),
            l = f(l, j, m, n, h[a + 0], 6, 4096336452),
            n = f(n, l, j, m, h[a + 7], 10, 1126891415),
            m = f(m, n, l, j, h[a + 14], 15, 2878612391),
            j = f(j, m, n, l, h[a + 5], 21, 4237533241),
            l = f(l, j, m, n, h[a + 12], 6, 1700485571),
            n = f(n, l, j, m, h[a + 3], 10, 2399980690),
            m = f(m, n, l, j, h[a + 10], 15, 4293915773),
            j = f(j, m, n, l, h[a + 1], 21, 2240044497),
            l = f(l, j, m, n, h[a + 8], 6, 1873313359),
            n = f(n, l, j, m, h[a + 15], 10, 4264355552),
            m = f(m, n, l, j, h[a + 6], 15, 2734768916),
            j = f(j, m, n, l, h[a + 13], 21, 1309151649),
            l = f(l, j, m, n, h[a + 4], 6, 4149444226),
            n = f(n, l, j, m, h[a + 11], 10, 3174756917),
            m = f(m, n, l, j, h[a + 2], 15, 718787259),
            j = f(j, m, n, l, h[a + 9], 21, 3951481745),
            l = b(l, p),
            j = b(j, r),
            m = b(m, q),
            n = b(n, o);
    return (g(l) + g(j) + g(m) + g(n)).toLowerCase()
}