<?php

namespace App\Http\Controllers;

use App\Models\DewaAttendance;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DewaAttendanceController extends Controller
{
    /**
     * Toggle Dewan attendance for today.
     */
    public function store(Request $request)
    {
        $today = Carbon::today('Asia/Jakarta');
        $user = $request->user();

        $attendance = DewaAttendance::updateOrCreate(
            ['date' => $today],
            [
                'is_present' => true,
                'marked_by' => $user->id,
            ]
        );

        return back()->with('success', 'Dewan attendance marked as present for today.');
    }

    /**
     * Remove Dewan attendance for today.
     */
    public function destroy(Request $request)
    {
        $today = Carbon::today('Asia/Jakarta');
        $user = $request->user();

        DewaAttendance::updateOrCreate(
            ['date' => $today],
            [
                'is_present' => false,
                'marked_by' => $user->id,
            ]
        );

        return back()->with('success', 'Dewan attendance marked as absent for today.');
    }
}