const express = require('express'),
      router = express.Router(),
      {admin}    = require("../helpers/admin"),
      adminController = require("../controllers/adminController")
      
router.get('/painel', adminController.getPainel)

router.get('/', adminController.getLogin)

router.post("/", adminController.postLogin)

router.get("/sair", adminController.getSair)

router.get("/registro", adminController.getRegistro)

router.post("/registro", adminController.postRegistro)











router.post('/checkin/deletar', admin, (req, res) => {
    /* Checkin.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Checkin deletado com sucesso!")
        res.redirect("/admin/checkins")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar postagem!")
        res.redirect("/admin/postagens")
    }) */
})


router.get("/usuarios", admin, (req, res) => {
   /*  Usuario.find().sort({_id: -1}).lean().then((usuarios) => {
        res.render("admin/usuarios", {usuarios: usuarios})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os usuarios")
        res.redirect("/admin")
    }) */
})

router.get("/usuarios/edit/:id", admin, (req, res) => {
    /* Usuario.findOne({_id: req.params.id}).lean().then((usuario)=>{
        res.render('admin/editusuarios', {usuario: usuario})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar usuario!")
        res.redirect("/admin/usuarios")
    }) */
})

router.post("/usuarios/edit", admin, (req, res) => {
    /* var erros = []
    if(!req.body.nome || typeof req.body.nome == '') {
        erros.push({texto: "Nome em branco!"})
    }
    if (!req.body.email || typeof req.body.email == '') {
        erros.push({texto: "Email em branco!"})
    }
    if (!req.body.admin || typeof req.body.admin == '') {
        erros.push({texto: "Campo admin em branco!"})
    }
    if (erros.length > 0) {
        Usuario.find().lean().sort({_id: -1}).then((usuarios) => {
            res.render("admin/usuarios", {erros: erros, usuarios: usuarios})
        })
    } else {
        Usuario.findOne({_id: req.body.id}).then((usuario) => {
            usuario.nome = req.body.nome
            usuario.email = req.body.email
            usuario.admin = req.body.admin
            usuario.save().then(() => {
                req.flash("success_msg", "Usuario editado com sucesso!")
                res.redirect("/admin/usuarios")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno ao salvar usuario!")
                res.redirect("/admin/usuarios")
                console.log(err)
            })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar usuario!")
            res.redirect("/admin/usuarios")
            console.log(err)
        })
    } */
})

router.post("/usuarios/deletar", admin, (req, res) => {
    /* Usuario.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Usuario apagado com sucesso!")
        res.redirect("/admin/usuarios")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar usuario!")
        res.redirect("/admin/usuarios")
    }) */
})

module.exports = router;