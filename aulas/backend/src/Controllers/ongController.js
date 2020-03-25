const connection = require('../database/connection');
const crypto = require('crypto');



module.exports = {
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); // gera 4 bytes de caracteres aleatorios e transforma em string hex
    
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        
        return response.json({ id });
    },

    async index (request, response){ // rota para listar as ongs cadastradas
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs)
    }

}