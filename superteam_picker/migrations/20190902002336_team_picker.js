exports.up = function (knex) {
    return knex.schema.createTable("cohorts", t => {
        t.bigIncrements("id");
        t.string("members");
        t.string("name");
        t.text("logoUrl");
        t.timestamp("createdAt").defaultTo(knex.fn.now());

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("cohorts");
};
