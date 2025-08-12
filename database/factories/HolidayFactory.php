<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Holiday>
 */
class HolidayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'date' => fake()->dateTimeBetween('-30 days', '+60 days')->format('Y-m-d'),
            'description' => fake()->optional()->paragraph(),
            'is_active' => fake()->boolean(90),
            'created_by' => User::factory(),
        ];
    }
}