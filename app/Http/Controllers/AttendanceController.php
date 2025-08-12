<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\DewaAttendance;
use App\Models\Holiday;
use App\Models\Mood;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of attendances.
     */
    public function index(Request $request)
    {
        $attendances = Attendance::with(['user.university', 'mood'])
            ->when($request->date, function ($query, $date) {
                return $query->forDate($date);
            })
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->user_id, function ($query, $userId) {
                return $query->where('user_id', $userId);
            })
            ->latest('date')
            ->latest('created_at')
            ->paginate(20);

        $users = User::students()->get(['id', 'name']);

        return Inertia::render('admin/attendance/index', [
            'attendances' => $attendances,
            'users' => $users,
            'filters' => $request->only(['date', 'status', 'user_id']),
        ]);
    }

    /**
     * Store a newly created attendance.
     */
    public function store(Request $request)
    {
        $request->validate([
            'status' => 'required|in:present,permission',
            'permission_note' => 'required_if:status,permission|nullable|string|max:500',
            'mood_id' => 'nullable|exists:moods,id',
        ]);

        $user = $request->user();
        $today = Carbon::today('Asia/Jakarta');
        $now = Carbon::now('Asia/Jakarta');

        // Check if it's a holiday
        if (Holiday::isToday()) {
            return back()->with('error', 'Cannot mark attendance on a holiday.');
        }

        // Check if attendance already exists
        $existingAttendance = Attendance::where('user_id', $user->id)
            ->today()
            ->first();

        if ($existingAttendance) {
            return back()->with('error', 'You have already marked your attendance for today.');
        }

        $data = [
            'user_id' => $user->id,
            'date' => $today,
            'status' => $request->status,
            'permission_note' => $request->permission_note,
            'mood_id' => $request->mood_id,
        ];

        // Set clock-in time and check for late status
        if ($request->status === 'present') {
            $data['clock_in_time'] = $now->format('H:i:s');
            
            // Check if late (after 09:45 AM)
            if ($now->isAfter(Carbon::parse('09:45:00', 'Asia/Jakarta'))) {
                $data['status'] = 'late';
            }
        }

        Attendance::create($data);

        return back()->with('success', 'Attendance marked successfully!');
    }

    /**
     * Update the specified attendance.
     */
    public function update(Request $request, Attendance $attendance)
    {
        $request->validate([
            'status' => 'required|in:present,permission,pending,late',
            'permission_note' => 'required_if:status,permission|nullable|string|max:500',
            'mood_id' => 'nullable|exists:moods,id',
            'clock_in_time' => 'nullable|date_format:H:i',
        ]);

        $data = $request->only(['status', 'permission_note', 'mood_id']);

        if ($request->status === 'present' || $request->status === 'late') {
            $data['clock_in_time'] = $request->clock_in_time ?? Carbon::now('Asia/Jakarta')->format('H:i:s');
        } else {
            $data['clock_in_time'] = null;
        }

        $attendance->update($data);

        return back()->with('success', 'Attendance updated successfully!');
    }

    /**
     * Remove the specified attendance.
     */
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return back()->with('success', 'Attendance deleted successfully!');
    }


}