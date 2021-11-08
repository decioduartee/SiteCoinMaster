module.exports = {
    admin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.cargo == "admin") {
            return next()
        }
        res.redirect("/")
    }
}