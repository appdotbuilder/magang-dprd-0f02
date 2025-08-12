<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DewaAttendanceController;
use App\Http\Controllers\JournalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dashboard routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Attendance routes
    Route::controller(AttendanceController::class)->group(function () {
        Route::get('/admin/attendance', 'index')->name('admin.attendance.index');
        Route::post('/attendance', 'store')->name('attendance.store');
        Route::put('/attendance/{attendance}', 'update')->name('attendance.update');
        Route::delete('/attendance/{attendance}', 'destroy')->name('attendance.destroy');
    });
    
    // Dewan attendance routes
    Route::controller(DewaAttendanceController::class)->group(function () {
        Route::post('/dewan-attendance', 'store')->name('dewan-attendance.store');
        Route::delete('/dewan-attendance', 'destroy')->name('dewan-attendance.destroy');
    });
    
    // Journal routes
    Route::resource('journals', JournalController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';