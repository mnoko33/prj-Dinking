module.exports = function(status, k, v) {
    if (k == 'err') {
        return {
            "status": status,
            "err": v
        }
    } 
    return {
        "status": status,
        "data": v
    }
}