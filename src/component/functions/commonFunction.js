//import moment from "moment";
import DateDiff from "date-diff";

 export function convertSecToTime(t) {
    let hours = Math.floor(t / 3600);
    let hh = hours < 10 ? "0" + (hours).toString()
        : (hours).toString();
    let min = Math.floor((t % 3600) / 60);
    let mm = min < 10 ? "0" + (min).toString()
        : (min).toString();
    let sec = ((t % 3600) % 60);
    let ss = sec < 10 ? "0" + (sec).toString()
        : (sec).toString();
    let ans = hh + ":" + mm ;//+ ":" + ss;
    return ans;
}

export function datediffToSec(startDatev, timeEndv)
{
    
    var diff = new DateDiff(startDatev, timeEndv);
    return diff.seconds();
}

