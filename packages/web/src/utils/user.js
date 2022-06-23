export const getUserAvatar = (profile) => {
    if (!profile) return process.env.USER_NO_IMAGE || '';
    const avatar = profile.avatar || 'upload/user.png';
    return process.env.STATIC + '/' + avatar;
}

export const getCode = (path) => {
    const part = path.split('uid')
    return part.slice(-1).pop().replace('-', '');
}