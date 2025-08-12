import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface TodayAttendance {
    id: number;
    status: string;
    clock_in_time?: string;
    permission_note?: string;
    mood?: {
        id: number;
        name: string;
        icon: string;
        color: string;
    };
}

interface AttendanceStats {
    total_records: number;
    present_count: number;
    late_count: number;
    permission_count: number;
    pending_count: number;
}

interface InternshipPeriod {
    start_date: string;
    end_date: string;
    total_days: number;
    days_remaining: number;
}

interface Reminder {
    id: number;
    title: string;
    content: string;
    reminder_date: string;
}

interface DewaAttendance {
    id: number;
    date: string;
    is_present: boolean;
    marked_by: number;
}

interface Props {
    today_attendance?: TodayAttendance;
    attendance_stats: AttendanceStats;
    internship_period: InternshipPeriod;
    upcoming_reminders: Reminder[];
    dewan_attendance?: DewaAttendance;
    is_holiday: boolean;
    can_mark_attendance: boolean;
    [key: string]: unknown;
}

export default function Dashboard({
    today_attendance,
    attendance_stats,
    internship_period,
    upcoming_reminders,
    dewan_attendance,
    is_holiday,
    can_mark_attendance
}: Props) {
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        status: 'present',
        permission_note: '',
        mood_id: ''
    });

    const handleMarkPresent = () => {
        post(route('attendance.store'), {
            onSuccess: () => {
                reset();
                setShowAttendanceModal(false);
            }
        });
    };

    const handleMarkPermission = () => {
        setData('status', 'permission');
        post(route('attendance.store'), {
            onSuccess: () => {
                reset();
                setShowPermissionModal(false);
            }
        });
    };

    const handleDewaAttendanceToggle = (isPresent: boolean) => {
        if (isPresent) {
            router.post(route('dewan-attendance.store'));
        } else {
            router.delete(route('dewan-attendance.destroy'));
        }
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            present: 'bg-green-100 text-green-800',
            late: 'bg-yellow-100 text-yellow-800', 
            permission: 'bg-blue-100 text-blue-800',
            pending: 'bg-gray-100 text-gray-800'
        };
        return badges[status] || badges.pending;
    };

    const getStatusIcon = (status: string) => {
        const icons: Record<string, string> = {
            present: '✅',
            late: '⚠️',
            permission: '📝',
            pending: '⏳'
        };
        return icons[status] || icons.pending;
    };

    return (
        <AppShell>
            <Head title="Dashboard" />

            <div className="container-fluid px-4 py-3">
                {/* Header */}
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="h3 mb-2">📊 Student Dashboard</h1>
                        <p className="text-muted mb-0">
                            Welcome back! Here's your internship overview for today.
                        </p>
                    </div>
                </div>

                {/* Holiday Notice */}
                {is_holiday && (
                    <div className="alert alert-info mb-4">
                        <div className="d-flex align-items-center">
                            <span className="me-2">🏖️</span>
                            <div>
                                <strong>Holiday Notice:</strong> Today is marked as a holiday. Attendance tracking is disabled.
                            </div>
                        </div>
                    </div>
                )}

                {/* Today's Attendance Card */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <h5 className="card-title mb-3">📅 Today's Attendance</h5>
                                        {today_attendance ? (
                                            <div className="d-flex align-items-center">
                                                <span className="me-2" style={{ fontSize: '1.5rem' }}>
                                                    {getStatusIcon(today_attendance.status)}
                                                </span>
                                                <div>
                                                    <span className={`badge ${getStatusBadge(today_attendance.status)} me-2`}>
                                                        {today_attendance.status.toUpperCase()}
                                                    </span>
                                                    {today_attendance.clock_in_time && (
                                                        <small className="text-muted">
                                                            Clock-in: {today_attendance.clock_in_time}
                                                        </small>
                                                    )}
                                                    {today_attendance.mood && (
                                                        <div className="mt-1">
                                                            <span 
                                                                className="badge"
                                                                style={{ backgroundColor: today_attendance.mood.color + '20', color: today_attendance.mood.color }}
                                                                title={today_attendance.mood.name}
                                                            >
                                                                {today_attendance.mood.icon} {today_attendance.mood.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : can_mark_attendance ? (
                                            <div>
                                                <p className="text-muted mb-3">You haven't marked your attendance today.</p>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => setShowAttendanceModal(true)}
                                                    >
                                                        ✅ Mark Present
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => setShowPermissionModal(true)}
                                                    >
                                                        📝 Request Permission
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-muted mb-0">
                                                {is_holiday ? 'Holiday - No attendance required' : 'Attendance already marked or unavailable'}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="mb-3">🏛️ Dewan Attendance</h6>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={dewan_attendance?.is_present || false}
                                                    onChange={(e) => handleDewaAttendanceToggle(e.target.checked)}
                                                />
                                                <label className="form-check-label">
                                                    {dewan_attendance?.is_present ? '✅ Present' : '❌ Absent'}
                                                </label>
                                            </div>
                                        </div>
                                        <small className="text-muted">Toggle Dewan presence for today</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row mb-4">
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="me-3" style={{ fontSize: '2rem' }}>✅</div>
                                    <div>
                                        <div className="h4 mb-0">{attendance_stats.present_count}</div>
                                        <small>Present Days</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-warning text-white">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="me-3" style={{ fontSize: '2rem' }}>⚠️</div>
                                    <div>
                                        <div className="h4 mb-0">{attendance_stats.late_count}</div>
                                        <small>Late Days</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-info text-white">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="me-3" style={{ fontSize: '2rem' }}>📝</div>
                                    <div>
                                        <div className="h4 mb-0">{attendance_stats.permission_count}</div>
                                        <small>Permission Days</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-secondary text-white">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="me-3" style={{ fontSize: '2rem' }}>⏳</div>
                                    <div>
                                        <div className="h4 mb-0">{attendance_stats.pending_count}</div>
                                        <small>Pending Days</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internship Period & Reminders */}
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">🗓️ Internship Period</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <strong>Period:</strong> {internship_period.start_date} to {internship_period.end_date}
                                </div>
                                <div className="mb-3">
                                    <strong>Total Days:</strong> {internship_period.total_days} days
                                </div>
                                <div className="mb-3">
                                    <strong>Days Remaining:</strong> 
                                    <span className={`ms-2 badge ${internship_period.days_remaining > 7 ? 'bg-success' : 'bg-warning'}`}>
                                        {internship_period.days_remaining} days
                                    </span>
                                </div>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{ 
                                            width: `${((internship_period.total_days - internship_period.days_remaining) / internship_period.total_days) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">🔔 Upcoming Reminders</h5>
                            </div>
                            <div className="card-body">
                                {upcoming_reminders.length > 0 ? (
                                    <div className="list-group list-group-flush">
                                        {upcoming_reminders.map((reminder) => (
                                            <div key={reminder.id} className="list-group-item px-0">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="mb-1">{reminder.title}</h6>
                                                    <small className="text-muted">{reminder.reminder_date}</small>
                                                </div>
                                                <p className="mb-1 small text-muted">{reminder.content}</p>
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
                                <h5 className="mb-0">🚀 Quick Actions</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mb-2">
                                        <a href="/journals" className="btn btn-outline-primary w-100">
                                            📖 View Journals
                                        </a>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <a href="/journals/create" className="btn btn-outline-success w-100">
                                            ✍️ Write Journal
                                        </a>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <a href="/profile" className="btn btn-outline-info w-100">
                                            👤 Edit Profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Modal */}
            {showAttendanceModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">✅ Mark Present</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowAttendanceModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>You are about to mark yourself as present for today.</p>
                                <div className="mb-3">
                                    <label className="form-label">How are you feeling today? (Optional)</label>
                                    <select 
                                        className="form-select"
                                        value={data.mood_id}
                                        onChange={(e) => setData('mood_id', e.target.value)}
                                    >
                                        <option value="">Select your mood...</option>
                                        <option value="1">😊 Happy</option>
                                        <option value="2">🤩 Excited</option>
                                        <option value="3">😐 Neutral</option>
                                        <option value="4">😴 Tired</option>
                                        <option value="5">😢 Sad</option>
                                    </select>
                                </div>
                                <small className="text-muted">
                                    Current time will be recorded as your clock-in time.
                                </small>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowAttendanceModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-success"
                                    onClick={handleMarkPresent}
                                    disabled={processing}
                                >
                                    {processing ? 'Marking...' : '✅ Confirm Present'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Permission Modal */}
            {showPermissionModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">📝 Request Permission</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowPermissionModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Reason for Permission *</label>
                                    <textarea
                                        className={`form-control ${errors.permission_note ? 'is-invalid' : ''}`}
                                        rows={3}
                                        value={data.permission_note}
                                        onChange={(e) => setData('permission_note', e.target.value)}
                                        placeholder="Please explain why you need permission today..."
                                    />
                                    {errors.permission_note && (
                                        <div className="invalid-feedback">
                                            {errors.permission_note}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">How are you feeling today? (Optional)</label>
                                    <select 
                                        className="form-select"
                                        value={data.mood_id}
                                        onChange={(e) => setData('mood_id', e.target.value)}
                                    >
                                        <option value="">Select your mood...</option>
                                        <option value="1">😊 Happy</option>
                                        <option value="2">🤩 Excited</option>
                                        <option value="3">😐 Neutral</option>
                                        <option value="4">😴 Tired</option>
                                        <option value="5">😢 Sad</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowPermissionModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={handleMarkPermission}
                                    disabled={processing || !data.permission_note.trim()}
                                >
                                    {processing ? 'Submitting...' : '📝 Submit Permission'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}