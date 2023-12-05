/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_data', table => {
    table.increments();
    table.string('first_name', 500); 
    table.string('last_name', 500);
    table.string('username', 500);
    table.string('password', 500);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_data')
};
