<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * The dashboard service instance.
     */
    protected DashboardService $dashboardService;

    /**
     * Create a new controller instance.
     */
    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today('Asia/Jakarta');
        
        if ($user->isAdmin()) {
            $data = $this->dashboardService->getAdminDashboardData($today);
            return Inertia::render('admin/dashboard', $data);
        }

        $data = $this->dashboardService->getUserDashboardData($user, $today);
        return Inertia::render('dashboard', $data);
    }
}