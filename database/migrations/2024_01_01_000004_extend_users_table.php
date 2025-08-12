<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nim')->nullable();
            $table->string('study_program')->nullable();
            $table->string('faculty')->nullable();
            $table->foreignId('university_id')->nullable()->constrained();
            $table->string('profile_photo')->nullable();
            $table->enum('role', ['admin', 'user'])->default('user');
            
            $table->index(['role']);
            $table->index(['university_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['university_id']);
            $table->dropColumn([
                'nim',
                'study_program', 
                'faculty',
                'university_id',
                'profile_photo',
                'role'
            ]);
        });
    }
};