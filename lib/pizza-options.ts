import { CrustOption, SauceOption, ToppingOption } from './types';

export const CRUST_OPTIONS: CrustOption[] = [
  { name: 'Regular Crust' },
  { name: 'Whole Wheat' },
  { name: 'Thin Crust' },
  { name: 'Extra Thin' },
  { name: 'Thick Crust' },
  { name: 'Pan Pizza', price: 2.99 },
];

export const SAUCE_OPTIONS: SauceOption[] = [
  { name: 'Regular Sauce' },
  { name: 'Easy Sauce' },
  { name: 'No Sauce' },
  { name: 'Extra Sauce' },
  { name: 'BBQ Sauce Instead Of Tomato' },
  { name: 'BBQ Sauce Mixed' },
  { name: 'Creamy Garlic Base', price: 1.99 },
  { name: 'Butter Chicken Sauce Base', price: 1.99 },
  { name: 'Shahi Paneer Base', price: 1.99 },
  { name: 'Chilli Mango Sauce', price: 1.99 },
];

export const ADDITIONAL_OPTIONS = [
  { id: 'bbq_top', name: 'BBQ Sauce on Top', price: 1.00 },
  { id: 'garlic_top', name: 'Garlic Sauce on Top', price: 1.00 },
  { id: 'well_done', name: 'Well Done' },
  { id: 'easy_cheese', name: 'Easy Cheese' },
  { id: 'light_done', name: 'Light Done' },
];

export const TOPPING_OPTIONS: ToppingOption[] = [
  // Meat
  { id: 'pepperoni', name: 'Pepperoni', category: 'Meat' },
  { id: 'ham', name: 'Ham', category: 'Meat' },
  { id: 'bacon', name: 'Bacon', category: 'Meat' },
  { id: 'bacon_strips', name: 'Bacon Strips', category: 'Meat' },
  { id: 'ground_beef', name: 'Ground Beef', category: 'Meat' },
  { id: 'salami', name: 'Salami', category: 'Meat' },
  { id: 'mild_sausage', name: 'Mild Sausage', category: 'Meat' },
  { id: 'hot_sausage', name: 'Hot Italian Sausage', category: 'Meat' },
  { id: 'meatball', name: 'Meatball', category: 'Meat' },
  { id: 'chicken', name: 'Chicken**', category: 'Meat' },
  { id: 'bbq_chicken', name: 'BBQ Chicken**', category: 'Meat' },
  { id: 'achari_chicken', name: 'Achari Chicken**', category: 'Meat' },
  { id: 'buffalo_chicken', name: 'Buffalo Chicken**', category: 'Meat' },
  { id: 'butter_chicken', name: 'Butter Chicken**', category: 'Meat' },
  { id: 'chicken_kebab', name: 'Chicken Kebab**', category: 'Meat' },
  { id: 'lamb_kebab', name: 'Lamb Kebab**', category: 'Meat' },
  { id: 'peri_peri_chicken', name: 'Peri Peri Chicken**', category: 'Meat' },
  { id: 'shawarma_chicken', name: 'Shawarma Chicken**', category: 'Meat' },
  { id: 'tandoori_chicken', name: 'Tandoori Chicken**', category: 'Meat' },

  // Halal
  { id: 'h_pepperoni', name: 'Halal Pepperoni', category: 'Halal' },
  { id: 'h_beef', name: 'Halal Beef', category: 'Halal' },
  { id: 'h_lamb_kebab', name: 'Halal Lamb Kebab**', category: 'Halal' },
  { id: 'h_bbq_chicken', name: 'Halal BBQ Chicken**', category: 'Halal' },
  { id: 'h_buffalo_chicken', name: 'Halal Buffalo Chicken**', category: 'Halal' },
  { id: 'h_butter_chicken', name: 'Halal Butter Chicken**', category: 'Halal' },
  { id: 'h_chicken', name: 'Halal Chicken**', category: 'Halal' },
  { id: 'h_chicken_kebab', name: 'Halal Chicken Kebab**', category: 'Halal' },
  { id: 'h_peri_peri_chicken', name: 'Halal Peri Peri Chicken**', category: 'Halal' },
  { id: 'h_shawarma_chicken', name: 'Halal Shawarma Chicken**', category: 'Halal' },
  { id: 'h_tandoori_chicken', name: 'Halal Tandoori Chicken**', category: 'Halal' },

  // Veggie
  { id: 'peri_peri_paneer', name: 'Peri Peri Paneer', category: 'Veggie' },
  { id: 'tandoori_chaap', name: 'Tandoori Chaap', category: 'Veggie' },
  { id: 'mushroom', name: 'Mushroom', category: 'Veggie' },
  { id: 'tomatoes', name: 'Tomatoes', category: 'Veggie' },
  { id: 'green_pepper', name: 'Green Pepper', category: 'Veggie' },
  { id: 'broccoli', name: 'Broccoli', category: 'Veggie' },
  { id: 'black_olives', name: 'Black Olives', category: 'Veggie' },
  { id: 'green_olives', name: 'Green Olives', category: 'Veggie' },
  { id: 'mango', name: 'Mango **NEW**', category: 'Veggie' },
  { id: 'red_onion', name: 'Red Onion', category: 'Veggie' },
  { id: 'achari_paneer', name: 'Achari Paneer', category: 'Veggie' },
  { id: 'spinach', name: 'Spinach', category: 'Veggie' },
  { id: 'hot_banana_peppers', name: 'Hot Banana Peppers', category: 'Veggie' },
  { id: 'achaari_chaap', name: 'Achaari Chaap', category: 'Veggie' },
  { id: 'corn', name: 'Corn', category: 'Veggie' },
  { id: 'pineapple', name: 'Pineapple', category: 'Veggie' },
  { id: 'pb_pepperoni', name: 'Plant Based Pepperoni**', category: 'Veggie' },
  { id: 'jalapeno_peppers', name: 'Jalapeno Peppers', category: 'Veggie' },
  { id: 'sundried_tomatoes', name: 'Sundried Tomatoes', category: 'Veggie' },
  { id: 'roasted_red_pepper', name: 'Roasted Red Pepper', category: 'Veggie' },
  { id: 'tandoori_paneer', name: 'Tandoori Paneer', category: 'Veggie' },
  { id: 'shahi_paneer', name: 'Shahi Paneer', category: 'Veggie' },

  // Free
  { id: 'coriander', name: 'Coriander*', category: 'Free' },
  { id: 'fresh_garlic', name: 'Fresh Garlic*', category: 'Free' },
  { id: 'green_chillies', name: 'Green Chillies*', category: 'Free' },
  { id: 'ginger', name: 'Ginger*', category: 'Free' },
  { id: 'dry_chilli_pepper', name: 'Dry Chilli Pepper*', category: 'Free' },
  { id: 'chilli_flakes', name: 'Chilli Flakes', category: 'Free' },
  { id: 'oregano', name: 'Oregano', category: 'Free' },
  { id: 'garlic_powder', name: 'Garlic Powder', category: 'Free' },

  // Cheese
  { id: 'feta', name: 'Feta', category: 'Cheese' },
  { id: 'no_cheese', name: 'No Cheese*', category: 'Cheese' },
  { id: 'cheddar_cheese', name: 'Cheddar Cheese', category: 'Cheese' },
  { id: 'extra_cheese', name: 'Extra Cheese', category: 'Cheese' },
  { id: 'mozzarella', name: 'Mozzarella', category: 'Cheese' },
  { id: 'parmesan', name: 'Parmesan', category: 'Cheese' },
  { id: 'dairy_free_cheese', name: 'Dairy Free Cheese', category: 'Cheese' },
];
