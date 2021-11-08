module.exports = {
    async principal(req, res, next) {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        if (req.user) {
            res.locals.usuarioLogado = req.user.toObject()
            if(res.locals.usuarioLogado.cargo == "admin") {
                res.locals.cargo = req.user.toObject()
            }
        }
        next()
    }
}