
const deleteCookie = (name) => {
    window.location.href = '/'
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getDate () {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `${ year }.${ month }.${ day } ${ hour }:${ minutes }:${ seconds }`;
}

function MemberConfirm (auth) {
    console.log(auth);
}



module.exports= {
    deleteCookie,
    getDate,
    MemberConfirm
}