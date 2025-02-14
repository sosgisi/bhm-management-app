<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 1000, 1000000),
            'unit' => $this->faker->randomElement(['pcs', 'kg', 'litre', 'box']),
            'quantity' => $this->faker->numberBetween(1, 1000),
            'category' => $this->faker->randomElement(['Cement', 'Wood', 'Steel', 'Paint', 'Tools']),
        ];
    }
}
