module.exports.validateRequest = (req) => {
    let request = req.url.split('/');
    let root = request[2];
    if(request[1] !== 'api')
        return true;

    switch (root) {
        case 'user':
            if(['login', 'register', 'logout'].indexOf(request[3]) !== -1)
                return true;
            let requestedID = parseInt(req.swagger.params.id.value, 10);
            return req.user.id === requestedID;
            break;

        case 'book':
            if(request.method === 'GET')
                return true;
            else {
                let userID = parseInt(req.query.userID, 10);
                return req.user.id === userID
            }
            break;

        case 'author':

            break;
        case 'event':
            break;
        default:
            return true;
    }
    let requestedID = parseInt(req.swagger.params.id.value, 10);
    if(!req.user)
        callback(new Error('You must login'));
    else if(req.user.id === requestedID) {
        console.log(requestedID);

        callback()
    } else
        callback(new Error('This is not your business man!'));






    return false
};