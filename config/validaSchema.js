const joi = require('joi')

function validaSchema(dados) {
    const schema = joi.object({
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
    });
    return joi.valid(dados, schema);
};

module.exports = validaSchema