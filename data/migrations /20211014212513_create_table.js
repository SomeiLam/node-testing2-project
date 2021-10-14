exports.up = function (knex) {
    return knex.schema.createTable("cats", table => {
        table.increments();
        table.string("name", 255).unique().notNullable();
        table.string("color", 255).notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("cats")
};
