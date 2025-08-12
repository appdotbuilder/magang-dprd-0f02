<?php

namespace Database\Seeders;

use App\Models\University;
use Illuminate\Database\Seeder;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        University::create([
            'name' => 'Universitas Islam Negeri Sumatera Utara',
            'short_name' => 'UINSU',
            'logo_path' => null,
        ]);

        University::create([
            'name' => 'Universitas Muhammadiyah Sumatera Utara',
            'short_name' => 'UMSU',
            'logo_path' => null,
        ]);
    }
}