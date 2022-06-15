export default function randomString(len = 16) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const id = [];
    const radix = chars.length;
    for (let i = 0; i < len; i++) {
        id[i] = chars[0 | Math.random() * radix];
    }
    return id.join('');
}
