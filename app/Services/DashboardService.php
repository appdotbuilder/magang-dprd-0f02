<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\DewaAttendance;
use App\Models\Holiday;
use App\Models\Reminder;
use App\Models\Setting;
use App\Models\User;
use Inertia\Inertia;

class DashboardService
{
    /**
     * Get admin dashboard data.
     */
    public function getAdminDashboardData($today)
    {
        $totalStudents = User::students()->count();
        
        $todayAttendances = Attendance::with(['user', 'mood'])
            ->today()
            ->get()
            ->groupBy('status');

        $presentCount = $todayAttendances->get('present', collect())->count();
        $lateCount = $todayAttendances->get('late', collect())->count();
        $permissionCount = $todayAttendances->get('permission', collect())->count();
        $pendingCount = $totalStudents - ($presentCount + $lateCount + $permissionCount);

        $recentAttendances = Attendance::with(['user', 'mood'])
            ->latest()
            ->take(10)
            ->get();

        $upcomingReminders = Reminder::active()
            ->upcoming()
            ->take(5)
            ->get();

        $dewaAttendance = DewaAttendance::today()->first();

        return [
            'stats' => [
                'total_students' => $totalStudents,
                'present_today' => $presentCount,
                'late_today' => $lateCount,
                'permission_today' => $permissionCount,
                'pending_today' => $pendingCount,
            ],
            'recent_attendances' => $recentAttendances,
            'upcoming_reminders' => $upcomingReminders,
            'dewan_attendance' => $dewaAttendance,
            'is_holiday' => Holiday::isToday(),
        ];
    }

    /**
     * Get user dashboard data.
     */
    public function getUserDashboardData($user, $today)
    {
        $todayAttendance = Attendance::where('user_id', $user->id)
            ->today()
            ->with('mood')
            ->first();

        $internshipStart = Setting::get('internship_start_date');
        $internshipEnd = Setting::get('internship_end_date');
        
        $totalDays = $internshipStart && $internshipEnd 
            ? \Carbon\Carbon::parse($internshipStart)->diffInDays(\Carbon\Carbon::parse($internshipEnd)) + 1
            : 0;

        $attendanceStats = Attendance::where('user_id', $user->id)
            ->selectRaw('
                COUNT(*) as total_records,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present_count,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late_count,
                SUM(CASE WHEN status = "permission" THEN 1 ELSE 0 END) as permission_count,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending_count
            ')
            ->first();

        $upcomingReminders = Reminder::active()
            ->upcoming()
            ->take(3)
            ->get();

        $dewaAttendance = DewaAttendance::today()->first();

        return [
            'today_attendance' => $todayAttendance,
            'attendance_stats' => $attendanceStats,
            'internship_period' => [
                'start_date' => $internshipStart,
                'end_date' => $internshipEnd,
                'total_days' => $totalDays,
                'days_remaining' => $internshipEnd 
                    ? max(0, \Carbon\Carbon::parse($internshipEnd)->diffInDays($today) + 1)
                    : 0,
            ],
            'upcoming_reminders' => $upcomingReminders,
            'dewan_attendance' => $dewaAttendance,
            'is_holiday' => Holiday::isToday(),
            'can_mark_attendance' => !$todayAttendance && !Holiday::isToday(),
        ];
    }
}