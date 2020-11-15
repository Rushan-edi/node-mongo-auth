var Joi = require('joi');

module.exports = {
    /**
     * @returns validation status
     * @param {*} data 
     */
    registerValidation: function (data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(6)
                .required(),
            email: Joi.string()
                .min(6).required()
                .email(),
            password: Joi.string()
                .min(6)
                .required(),
        })
        return schema.validate(data)
    },
    /**
     * @returns validation status
     * @param {*} data 
     */
    logginValidation: function (data) {
        const schema = Joi.object({
            email: Joi.string()
                .min(6).required()
                .email(),
            password: Joi.string()
                .min(6)
                .required(),
        })
        return schema.validate(data)
    }

}