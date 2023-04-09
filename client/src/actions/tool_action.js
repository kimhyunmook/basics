
const deleteCookie = (name) => {
    window.location.href = '/'
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getDate (type) {
    const time = new Date();
    const year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let display;

    if (month < 10) month = `0${ month }`;
    if (day < 10) day = `0${ day }`;
    if (hour < 10) hour = `0${ hour }`;
    if (minutes < 10) minutes = `0${ minutes }`;
    if (seconds < 10) seconds = `0${ seconds }`;
    
    switch (type) {
        case 'display': display = `${month}.${day} ${hour}:${minutes}`
            break;
        default : display = `${ year }.${ month }.${ day } ${ hour }:${ minutes }:${ seconds }`;
            break;
    }

    return display;
}

function displayDate (time) {

}

function MemberConfirm (auth) {
    console.log(auth);
}



module.exports= {
    deleteCookie,
    getDate,
    displayDate,
    MemberConfirm
}