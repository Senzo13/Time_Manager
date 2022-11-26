import moment from 'moment';

const calculWT = (wt) => {
    const start = moment(wt.start);
    const end = moment(wt.end);
    const duration = moment.duration(end.diff(start));
    const total = duration.asMinutes();
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    const result = `${hours}:${minutes}`;
    return result;
};
const calculInHours = (wt) => {
    const duration = wt.duration;
    const breaked = wt.break;
    console.log(duration, "duration");
    console.log(breaked, "breaked");

};

const calculAverage = (wt) => {
    const start = moment(wt.start);
    const end = moment(wt.end);
    const duration = moment.duration(end.diff(start));
    const total = duration.asMinutes();
    return total;
};

export { calculWT, calculAverage, calculInHours };

