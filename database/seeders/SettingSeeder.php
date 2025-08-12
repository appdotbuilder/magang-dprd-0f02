<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'key' => 'internship_start_date',
            'value' => '2025-08-04',
            'type' => 'date',
            'description' => 'Start date of the internship period',
        ]);

        Setting::create([
            'key' => 'internship_end_date',
            'value' => '2025-09-04',
            'type' => 'date',
            'description' => 'End date of the internship period',
        ]);

        Setting::create([
            'key' => 'late_threshold_time',
            'value' => '09:45:00',
            'type' => 'time',
            'description' => 'Time threshold for marking attendance as late',
        ]);

        Setting::create([
            'key' => 'timezone',
            'value' => 'Asia/Jakarta',
            'type' => 'string',
            'description' => 'Application timezone',
        ]);
    }
}