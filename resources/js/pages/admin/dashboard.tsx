import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    total_students: number;
    present_today: number;
    late_today: number;
    permission_today: number;
    pending_today: number;
}

interface Attendance {
    id: number;
    user: {
        id: number;
        name: string;
    };
    status: string;
    clock_in_time?: string;
    created_at: string;
}

interface Reminder {
    id: number;
    title: string;
    content: string;
    reminder_date: string;
}

interface Props {
    stats: Stats;
    recent_attendances: Attendance[];
    upcoming_reminders: Reminder[];
    dewan_attendance?: {
        id: number;
        is_present: boolean;
    };

    [key: string]: unknown;
}

export default function AdminDashboard({
    stats,
    recent_attendances,
    upcoming_reminders,
    dewan_attendance
}: Props) {
    return (
        <AppShell>
            <Head title="Admin Dashboard" />

            <div className="container-fluid px-4 py-3">
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="h3 mb-2">👨‍💼 Admin Dashboard</h1>
                        <p className="text-muted mb-0">
                            Monitor student attendance and manage the internship program
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row mb-4">
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card bg-primary text-white">
                            <div className="card-body text-center">
                                <div className="h4 mb-0">{stats.total_students}</div>
                                <small>Total Students</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card bg-success text-white">
                            <div className="card-body text-center">
                                <div className="h4 mb-0">{stats.present_today}</div>
                                <small>Present Today</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card bg-warning text-dark">
                            <div className="card-body text-center">
                                <div className="h4 mb-0">{stats.late_today}</div>
                                <small>Late Today</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card bg-info text-white">
                            <div className="card-body text-center">
                                <div className="h4 mb-0">{stats.permission_today}</div>
                                <small>Permission Today</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card bg-secondary text-white">
                            <div className="card-body text-center">
                                <div className="h4 mb-0">{stats.pending_today}</div>
                                <small>Pending Today</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className={`card ${dewan_attendance?.is_present ? 'bg-success' : 'bg-danger'} text-white`}>
                            <div className="card-body text-center">
                                <div className="h4 mb-0">
                                    {dewan_attendance?.is_present ? '✅' : '❌'}
                                </div>
                                <small>Dewan Status</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity and Reminders */}
                <div className="row">
                    <div className="col-lg-8 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">📊 Recent Attendance</h5>
                            </div>
                            <div className="card-body">
                                {recent_attendances.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Student</th>
                                                    <th>Status</th>
                                                    <th>Time</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recent_attendances.map((attendance) => (
                                                    <tr key={attendance.id}>
                                                        <td>{attendance.user.name}</td>
                                                        <td>
                                                            <span className={`badge ${
                                                                attendance.status === 'present' ? 'bg-success' :
                                                                attendance.status === 'late' ? 'bg-warning' :
                                                                attendance.status === 'permission' ? 'bg-info' :
                                                                'bg-secondary'
                                                            }`}>
                                                                {attendance.status}
                                                            </span>
                                                        </td>
                                                        <td>{attendance.clock_in_time || '-'}</td>
                                                        <td>
                                                            {new Date(attendance.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-muted mb-0">No recent attendance records</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">🔔 Upcoming Reminders</h5>
                            </div>
                            <div className="card-body">
                                {upcoming_reminders.length > 0 ? (
                                    <div>
                                        {upcoming_reminders.map((reminder) => (
                                            <div key={reminder.id} className="mb-3">
                                                <h6 className="mb-1">{reminder.title}</h6>
                                                <p className="mb-1 small text-muted">{reminder.content}</p>
                                                <small className="text-muted">{reminder.reminder_date}</small>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted mb-0">No upcoming reminders</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">⚡ Quick Actions</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 mb-2">
                                        <a href="/admin/attendance" className="btn btn-outline-primary w-100">
                                            📊 View All Attendance
                                        </a>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <a href="/admin/students" className="btn btn-outline-success w-100">
                                            👥 Manage Students
                                        </a>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <a href="/admin/reminders" className="btn btn-outline-info w-100">
                                            🔔 Manage Reminders
                                        </a>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <a href="/admin/reports" className="btn btn-outline-warning w-100">
                                            📄 Generate Reports
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}