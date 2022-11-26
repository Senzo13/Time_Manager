import moment from 'moment';

const calculWT = (wt) => {
    // console.log(wt);
    const start = moment(wt.start);
    const end = moment(wt.end);
    const duration = moment.duration(end.diff(start));
    const total = duration.asMinutes();
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    // console.log(total, "tot");
    // console.log(hours, "hour");
    // console.log(minutes, "methods");
    const result = `${hours}h:${minutes}min`;
    return result;    
};

export { calculWT };