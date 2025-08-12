<?php

namespace Database\Factories;

use App\Models\Mood;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['present', 'permission', 'pending', 'late']);
        
        return [
            'user_id' => User::factory(),
            'date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'status' => $status,
            'clock_in_time' => $status === 'present' || $status === 'late' 
                ? fake()->time('H:i:s', '11:00:00')
                : null,
            'permission_note' => $status === 'permission' 
                ? fake()->sentence()
                : null,
            'mood_id' => fake()->boolean(70) ? Mood::factory() : null,
        ];
    }
}