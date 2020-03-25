exports.up = function(knex) { // método Up para criar novo item de tabela
 return knex.schema.createTable('ongs', function(table){
      table.string('id').primary();
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf',2).notNullable() // o segundo parâmetro é o tamanho do texto;
  } )
};

exports.down = function(knex) { // método down é para desfazer tabelas
  return knex.schema.dropTable('ongs')
};
