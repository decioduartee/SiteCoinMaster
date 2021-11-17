const joi = require('@hapi/joi')


const validaSchemaFooter = joi.object().keys({
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
        .required()
})

const validaSchemaCadastro = joi.object().keys({
    nome: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
        .required(),
    senha: joi.string()
        .pattern(/^[a-zA-Z0-9]{4,30}$/)
        .required()
})


module.exports = validaSchemaFooter, validaSchemaCadastro