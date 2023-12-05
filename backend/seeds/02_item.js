/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_id: 1, item_name: 'item1', description: 'wicked sick', quantity: 18},
    {user_id: 1, item_name: 'item2', description: 'very awesome and epic', quantity: 994},
    {user_id: 2, item_name: 'chocolate', description: 'chocolate flavored', quantity: 4},
    {user_id: 2, item_name: 'vanilla', description: 'vanilla flavored', quantity: 2},
    {user_id: 2, item_name: 'strawberry', description: 'strawberry flavored', quantity: 22},
  ]);
};
