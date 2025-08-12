<?php

namespace Database\Seeders;

use App\Models\Mood;
use Illuminate\Database\Seeder;

class MoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $moods = [
            ['name' => 'Happy', 'icon' => '😊', 'color' => '#10B981'],
            ['name' => 'Excited', 'icon' => '🤩', 'color' => '#F59E0B'],
            ['name' => 'Neutral', 'icon' => '😐', 'color' => '#6B7280'],
            ['name' => 'Tired', 'icon' => '😴', 'color' => '#8B5CF6'],
            ['name' => 'Sad', 'icon' => '😢', 'color' => '#EF4444'],
        ];

        foreach ($moods as $mood) {
            Mood::create($mood);
        }
    }
}