export const formatDuration = () => {
    const hour = document.getElementById('hour').value;
    const minutes = document.getElementById('minute').value;

    if(minutes > 59){
        return;
    }

    if (minutes == 0) {
        return `${hour}h`;
    } else if (minutes < 10) {
        return `${hour}h0${minutes}m`;
    } else {
        return `${hour}h${minutes}m`;
    } 
};