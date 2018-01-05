const padding = (value) => {
    value = value + '';
    if (value.length === 1) {
        return '0' + value;
    }

    return value;
}

export const format = (timestamp) => {
    const nowDate = new Date();
    const now = nowDate.getTime();
    const targetDate = new Date(timestamp);
    let diff = (now - timestamp) / 1000;

    if (diff < 60) {
        return '刚刚';
    }

    diff /= 60;

    if (diff < 60) {
        return Math.round(diff) + '分钟前';
    }

    diff /= 60;
    // diff /= 24;

    const hours = padding(targetDate.getHours()) + ':' + padding(targetDate.getMinutes());


    if (diff < nowDate.getHours()) {
        return '今天 ' + hours;
    } else if (diff < nowDate.getHours() + 24) {
        return '昨天 ' + hours;
    } else if (diff < nowDate.getHours() + 48) {
        return '前天 ' + hours;
    }

    const days = (targetDate.getMonth() + 1) + '月' + targetDate.getDate() + '日';

    if (targetDate.getUTCFullYear() === nowDate.getUTCFullYear()) {
        return days + ' ' + hours;
    }

    return targetDate.getUTCFullYear() + '年' + ' ' + days + ' ' + hours;
}
