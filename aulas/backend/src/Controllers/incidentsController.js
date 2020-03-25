const connection = require('../database/connection');
const crypto = require('crypto');



module.exports = {
    async create(request, response){
        const {title, description, value} = request.body; // pega o que foi mandado e coloca nas variáveis

        const ong_id = request.headers.authorization;   // pega o id da ong que venho no "header" 
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return response.json({ id });
    },

    async index (request, response){ // rota para listar os casos cadastradas
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count(); // pegar só o primeiro elemento do array
        
        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents').join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5).offset((page -1)*5)
        .select('incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'); // seleciona todos os casos da tabela

        return response.json(incidents);
    },


    async delete(request, response){ // rota para deletar os casos 
        const { id } = request.params; // para os parâmetro do id da rota "/:id"
        const ong_id = request.headers.authorization; // pega o id da ong que está deletando o caso

        const incident = await connection('incidents').where('id', id).select('ong_id').first(); // pega na tabela de "incidents"
        // onde o id é o id que foi recebido no recurso,
        if(incident.ong_id !== ong_id){ // verifica se o id da ong que está querendo deletar o caso é o mesmo de quem criou o caso
            return response.status(401).json({error: 'Operation not permited'});
        }

        await connection('incidents').where('id',id).delete(); // busca na tabela de casos o id passado para ser deletado

        return response.status(204).send(); // resposta que foi concluido
    }

}