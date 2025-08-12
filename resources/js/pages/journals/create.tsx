import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Mood {
    id: number;
    name: string;
    icon: string;
    color: string;
}

interface Props {
    moods: Mood[];
    [key: string]: unknown;
}

export default function CreateJournal({ moods }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        content: '',
        mood_id: '',
        attachment: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('journals.store'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('attachment', e.target.files[0]);
        }
    };

    return (
        <AppShell>
            <Head title="Write New Journal" />

            <div className="container-fluid px-4 py-3">
                {/* Header */}
                <div className="row mb-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href={route('journals.index')}>📖 Journals</Link>
                                </li>
                                <li className="breadcrumb-item active">Write New Journal</li>
                            </ol>
                        </nav>
                        <h1 className="h3 mb-2">✍️ Write New Journal Entry</h1>
                        <p className="text-muted mb-0">
                            Document your thoughts, activities, and experiences from today
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Date */}
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">
                                            📅 Date *
                                        </label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                            id="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                        />
                                        {errors.date && (
                                            <div className="invalid-feedback">
                                                {errors.date}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">
                                            📝 Journal Content *
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                            id="content"
                                            rows={8}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="What happened today? Share your thoughts, activities, learnings, and experiences..."
                                            required
                                        />
                                        {errors.content && (
                                            <div className="invalid-feedback">
                                                {errors.content}
                                            </div>
                                        )}
                                        <div className="form-text">
                                            Write freely about your internship day. Include activities, learnings, challenges, and reflections.
                                        </div>
                                    </div>

                                    {/* Mood */}
                                    <div className="mb-3">
                                        <label htmlFor="mood_id" className="form-label">
                                            😊 How are you feeling?
                                        </label>
                                        <select
                                            className={`form-select ${errors.mood_id ? 'is-invalid' : ''}`}
                                            id="mood_id"
                                            value={data.mood_id}
                                            onChange={(e) => setData('mood_id', e.target.value)}
                                        >
                                            <option value="">Select your mood...</option>
                                            {moods.map((mood) => (
                                                <option key={mood.id} value={mood.id}>
                                                    {mood.icon} {mood.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.mood_id && (
                                            <div className="invalid-feedback">
                                                {errors.mood_id}
                                            </div>
                                        )}
                                        <div className="form-text">
                                            Optional: Select a mood that reflects how you feel about today
                                        </div>
                                    </div>

                                    {/* Attachment */}
                                    <div className="mb-4">
                                        <label htmlFor="attachment" className="form-label">
                                            📎 Attachment (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            className={`form-control ${errors.attachment ? 'is-invalid' : ''}`}
                                            id="attachment"
                                            onChange={handleFileChange}
                                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                        />
                                        {errors.attachment && (
                                            <div className="invalid-feedback">
                                                {errors.attachment}
                                            </div>
                                        )}
                                        <div className="form-text">
                                            Allowed formats: JPG, PNG, PDF, DOC, DOCX (max 10MB)
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>💾 Save Journal</>
                                            )}
                                        </button>
                                        <Link
                                            href={route('journals.index')}
                                            className="btn btn-secondary"
                                        >
                                            ❌ Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="card mt-4 border-0 bg-light">
                            <div className="card-body">
                                <h6 className="card-title">💡 Writing Tips</h6>
                                <ul className="mb-0 small">
                                    <li>Describe the main activities you did today</li>
                                    <li>Reflect on what you learned or observed</li>
                                    <li>Note any challenges you faced and how you overcame them</li>
                                    <li>Include your interactions with colleagues or mentors</li>
                                    <li>Think about how today contributes to your overall internship goals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}