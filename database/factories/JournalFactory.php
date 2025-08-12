<?php

namespace Database\Factories;

use App\Models\Mood;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Journal>
 */
class JournalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'content' => fake()->paragraphs(3, true),
            'mood_id' => fake()->boolean(60) ? Mood::factory() : null,
            'attachment' => null,
        ];
    }
}