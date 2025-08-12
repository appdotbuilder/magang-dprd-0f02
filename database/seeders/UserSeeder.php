<?php

namespace Database\Seeders;

use App\Models\University;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Haidar Al-Mutawalli',
            'email' => 'haidar@dprd.local',
            'password' => Hash::make('Password123!'),
            'role' => 'admin',
            'nim' => null,
            'study_program' => null,
            'faculty' => null,
            'university_id' => null,
        ]);

        $uinsu = University::where('short_name', 'UINSU')->first();
        $umsu = University::where('short_name', 'UMSU')->first();

        // Create UINSU students
        $uinsuStudents = [
            ['name' => 'Ahmad Rizki Pratama', 'nim' => '11220001', 'study_program' => 'Teknik Informatika', 'faculty' => 'Sains dan Teknologi'],
            ['name' => 'Siti Aisyah Putri', 'nim' => '11220002', 'study_program' => 'Sistem Informasi', 'faculty' => 'Sains dan Teknologi'],
            ['name' => 'Muhammad Fadli', 'nim' => '11220003', 'study_program' => 'Ilmu Komunikasi', 'faculty' => 'Ilmu Sosial'],
            ['name' => 'Nur Halimah', 'nim' => '11220004', 'study_program' => 'Ekonomi Islam', 'faculty' => 'Ekonomi dan Bisnis Islam'],
            ['name' => 'Dedi Kurniawan', 'nim' => '11220005', 'study_program' => 'Pendidikan Bahasa Arab', 'faculty' => 'Ilmu Tarbiyah dan Keguruan'],
            ['name' => 'Fitri Ramadani', 'nim' => '11220006', 'study_program' => 'Psikologi Islam', 'faculty' => 'Ushuluddin dan Studi Islam'],
            ['name' => 'Bayu Setiawan', 'nim' => '11220007', 'study_program' => 'Hukum Keluarga Islam', 'faculty' => 'Syariah dan Hukum'],
            ['name' => 'Indah Permatasari', 'nim' => '11220008', 'study_program' => 'Dakwah dan Komunikasi Islam', 'faculty' => 'Dakwah dan Komunikasi'],
        ];

        foreach ($uinsuStudents as $student) {
            User::create([
                'name' => $student['name'],
                'email' => strtolower(str_replace(' ', '.', $student['name'])) . '@students.uinsu.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'nim' => $student['nim'],
                'study_program' => $student['study_program'],
                'faculty' => $student['faculty'],
                'university_id' => $uinsu->id,
            ]);
        }

        // Create UMSU students
        $umsuStudents = [
            ['name' => 'Rian Pratama', 'nim' => '21220001', 'study_program' => 'Teknik Informatika', 'faculty' => 'Teknik'],
            ['name' => 'Maya Sari', 'nim' => '21220002', 'study_program' => 'Manajemen', 'faculty' => 'Ekonomi dan Bisnis'],
            ['name' => 'Andi Wijaya', 'nim' => '21220003', 'study_program' => 'Hukum', 'faculty' => 'Hukum'],
            ['name' => 'Dewi Lestari', 'nim' => '21220004', 'study_program' => 'Pendidikan Bahasa Indonesia', 'faculty' => 'Keguruan dan Ilmu Pendidikan'],
            ['name' => 'Fajar Nugraha', 'nim' => '21220005', 'study_program' => 'Akuntansi', 'faculty' => 'Ekonomi dan Bisnis'],
            ['name' => 'Rini Anggraini', 'nim' => '21220006', 'study_program' => 'Psikologi', 'faculty' => 'Psikologi'],
            ['name' => 'Agus Santoso', 'nim' => '21220007', 'study_program' => 'Teknik Sipil', 'faculty' => 'Teknik'],
            ['name' => 'Lina Marlina', 'nim' => '21220008', 'study_program' => 'Ilmu Komunikasi', 'faculty' => 'Ilmu Sosial dan Ilmu Politik'],
        ];

        foreach ($umsuStudents as $student) {
            User::create([
                'name' => $student['name'],
                'email' => strtolower(str_replace(' ', '.', $student['name'])) . '@students.umsu.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'nim' => $student['nim'],
                'study_program' => $student['study_program'],
                'faculty' => $student['faculty'],
                'university_id' => $umsu->id,
            ]);
        }
    }
}