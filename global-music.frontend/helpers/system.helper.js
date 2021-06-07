export const sliceMusicId = (args) => {
    if (typeof args === 'object') {
        return args[0];
    }
    return args;
}

export const sliceError = (err) => {
    return String(err).replace(/Error: /g, '').trim();
}