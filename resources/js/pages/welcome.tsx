import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Magang DPRD - Internship Management System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📋</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Magang DPRD</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                📋 <span className="text-blue-600">Magang DPRD</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive internship management system for tracking attendance, 
                                managing daily journals, and monitoring student progress at DPRD
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                <div className="text-3xl mb-3">🎓</div>
                                <h3 className="text-2xl font-bold text-gray-900">16 Students</h3>
                                <p className="text-gray-600">From UINSU & UMSU</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                <div className="text-3xl mb-3">📅</div>
                                <h3 className="text-2xl font-bold text-gray-900">Daily Tracking</h3>
                                <p className="text-gray-600">Attendance & Journals</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                <div className="text-3xl mb-3">📊</div>
                                <h3 className="text-2xl font-bold text-gray-900">Smart Reports</h3>
                                <p className="text-gray-600">PDF Exports & Analytics</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                            >
                                🚀 Get Started
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
                            >
                                👥 Join as Student
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                🌟 Powerful Features
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Everything you need to manage your internship program effectively
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Attendance Tracking */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Attendance</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✅ Clock-in with timestamps</li>
                                    <li>⚠️ Automatic late detection (after 9:45 AM)</li>
                                    <li>📝 Permission requests with notes</li>
                                    <li>🎭 Mood tracking integration</li>
                                </ul>
                            </div>

                            {/* Journal Management */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                                <div className="text-4xl mb-4">📖</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Journals</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✍️ Rich text journal entries</li>
                                    <li>😊 Mood selection for each entry</li>
                                    <li>📎 File attachments support</li>
                                    <li>🔒 Private & secure storage</li>
                                </ul>
                            </div>

                            {/* Admin Dashboard */}
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-8 border border-purple-100">
                                <div className="text-4xl mb-4">👨‍💼</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Control</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📊 Real-time attendance dashboard</li>
                                    <li>👥 Student management system</li>
                                    <li>🎯 Performance analytics</li>
                                    <li>📄 PDF report generation</li>
                                </ul>
                            </div>

                            {/* University Integration */}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-orange-100">
                                <div className="text-4xl mb-4">🏛️</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-University</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>🎓 UINSU & UMSU integration</li>
                                    <li>🏷️ Faculty & program tracking</li>
                                    <li>📋 Student profiles with NIM</li>
                                    <li>🖼️ University logos display</li>
                                </ul>
                            </div>

                            {/* Mobile Responsive */}
                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 border border-pink-100">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Ready</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📱 Responsive Bootstrap 5 design</li>
                                    <li>⚡ Fast loading & real-time updates</li>
                                    <li>🌙 Clean, modern interface</li>
                                    <li>🔔 Smart notifications system</li>
                                </ul>
                            </div>

                            {/* Additional Features */}
                            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-100">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Features</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📅 Holiday management system</li>
                                    <li>🔔 Automated reminders</li>
                                    <li>🏛️ Dewan attendance toggle</li>
                                    <li>⚙️ Configurable settings</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                🚀 How It Works
                            </h2>
                            <p className="text-xl text-gray-600">Simple 3-step process to get started</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-white">1️⃣</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Register & Login</h3>
                                <p className="text-gray-600">
                                    Create your account with university details and get instant access to the system
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-white">2️⃣</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Mark Attendance</h3>
                                <p className="text-gray-600">
                                    Clock-in daily before 9:45 AM, request permission when needed, and track your mood
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-white">3️⃣</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Write & Track</h3>
                                <p className="text-gray-600">
                                    Document your daily activities, attach files, and monitor your internship progress
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-blue-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Start Your Internship Journey? 🎯
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Join the digital internship management system and make your DPRD internship experience 
                            more organized and productive.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
                            >
                                🎓 Register as Student
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                            >
                                👨‍💼 Admin Login
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📋</span>
                                </div>
                                <h3 className="text-xl font-bold">Magang DPRD</h3>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Professional internship management system for DPRD students
                            </p>
                            <div className="border-t border-gray-700 pt-8">
                                <p className="text-gray-500">
                                    © 2024 Magang DPRD. Built with Laravel & React for modern internship management.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}