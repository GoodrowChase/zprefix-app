/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {"user_id": 1, "item_name": "Banana", "description": "A delicious yellow fruit with a sweet and creamy taste. Bananas are a great source of potassium and energy.", "quantity": 10},
    {"user_id": 1, "item_name": "Apple", "description": "Crisp and juicy, apples come in various varieties. They are not only tasty but also packed with vitamins and fiber.", "quantity": 15},
    {"user_id": 1, "item_name": "Orange", "description": "Oranges are citrusy delights, bursting with vitamin C. Peel away the bright orange skin to reveal the succulent segments inside.", "quantity": 8},
    {"user_id": 1, "item_name": "Grapes", "description": "Grapes are small, sweet, and versatile. Whether you prefer red or green, grapes make for a delightful snack or addition to salads.", "quantity": 20},
    {"user_id": 2, "item_name": "Carrot", "description": "Crunchy and vibrant orange, carrots are not only great for snacking but also rich in beta-carotene, promoting healthy vision.", "quantity": 12},
    {"user_id": 2, "item_name": "Broccoli", "description": "Green and nutrient-packed, broccoli is a cruciferous vegetable that adds a nutritional boost to your meals. Steam, roast, or stir-fry for optimal flavor.", "quantity": 18},
    {"user_id": 2, "item_name": "Tomato", "description": "Versatile and red, tomatoes add flavor to salads, sandwiches, and sauces. They are a rich source of antioxidants and vitamins.", "quantity": 25},
    {"user_id": 2, "item_name": "Cucumber", "description": "Cool and refreshing, cucumbers are hydrating vegetables perfect for salads and snacks. Slice them thin for a light and crisp texture.", "quantity": 14},
    {"user_id": 2, "item_name": "Watermelon", "description": "Sweet and hydrating, watermelons are the epitome of summer refreshment. Enjoy the juicy, pink flesh for a burst of delicious flavor.", "quantity": 5}
  ]);
};
