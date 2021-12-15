import moment from 'moment';

export function formatTime(time, formatStr, defaultVal) {
    formatStr = formatStr || 'YYYY/MM/DD hh:mm:ss';
    time = Number(time);
    return time > 0 ? moment(time).format(formatStr) : (defaultVal || '');
}