/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_data').del()
  await knex('user_data').insert([
    {first_name: 'John', last_name: 'Doe', username: 'Jdoe', password: "$2b$10$p7388lCoNaqD4nYHUGdCu.DVQcAwqlHl6xZj6jJ7aU5Q/h0v1bJ1G",},
    {first_name: 'Adam', last_name: 'Smith', username: 'Asmith', password: "$2b$10$rchqcmsSjvXXJUe1w1LpA.TNFAcHCYm362vXOONjVWBDn8qua0vfW",}
  ]);
};
