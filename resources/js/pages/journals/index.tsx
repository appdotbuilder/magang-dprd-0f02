import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Journal {
    id: number;
    date: string;
    content: string;
    mood?: {
        id: number;
        name: string;
        icon: string;
        color: string;
    };
    attachment?: string;
    created_at: string;
}

interface Props {
    journals: {
        data: Journal[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        prev_page_url?: string;
        next_page_url?: string;
    };
    search?: string;
    [key: string]: unknown;
}

export default function JournalIndex({ journals, search }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search') as string;
        
        router.get(route('journals.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateContent = (content: string, maxLength: number = 200) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <AppShell>
            <Head title="My Journals" />

            <div className="container-fluid px-4 py-3">
                {/* Header */}
                <div className="row mb-4">
                    <div className="col-md-8">
                        <h1 className="h3 mb-2">📖 My Daily Journals</h1>
                        <p className="text-muted mb-0">
                            Document your internship journey and reflect on daily experiences
                        </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <Link
                            href={route('journals.create')}
                            className="btn btn-primary"
                        >
                            ✍️ Write New Journal
                        </Link>
                    </div>
                </div>

                {/* Search */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <form onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search journals..."
                                    name="search"
                                    defaultValue={search || ''}
                                />
                                <button className="btn btn-outline-secondary" type="submit">
                                    🔍 Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Journal List */}
                <div className="row">
                    <div className="col-12">
                        {journals.data.length > 0 ? (
                            <>
                                <div className="row">
                                    {journals.data.map((journal) => (
                                        <div key={journal.id} className="col-lg-6 col-xl-4 mb-4">
                                            <div className="card h-100 shadow-sm border-0">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <div>
                                                            <h5 className="card-title mb-1">
                                                                📅 {formatDate(journal.date)}
                                                            </h5>
                                                            <small className="text-muted">
                                                                {new Date(journal.created_at).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                        {journal.mood && (
                                                            <span 
                                                                className="badge rounded-pill"
                                                                style={{ 
                                                                    backgroundColor: journal.mood.color + '20',
                                                                    color: journal.mood.color 
                                                                }}
                                                                title={journal.mood.name}
                                                            >
                                                                {journal.mood.icon}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <p className="card-text text-muted">
                                                        {truncateContent(journal.content)}
                                                    </p>
                                                    
                                                    {journal.attachment && (
                                                        <div className="mb-3">
                                                            <small className="text-muted">
                                                                📎 Has attachment
                                                            </small>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="card-footer bg-transparent border-0 pt-0">
                                                    <div className="d-flex gap-2">
                                                        <Link
                                                            href={route('journals.show', journal.id)}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            👁️ View
                                                        </Link>
                                                        <Link
                                                            href={route('journals.edit', journal.id)}
                                                            className="btn btn-sm btn-outline-secondary"
                                                        >
                                                            ✏️ Edit
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {(journals.prev_page_url || journals.next_page_url) && (
                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <nav>
                                                <ul className="pagination justify-content-center">
                                                    {journals.prev_page_url && (
                                                        <li className="page-item">
                                                            <Link 
                                                                className="page-link" 
                                                                href={journals.prev_page_url}
                                                            >
                                                                ← Previous
                                                            </Link>
                                                        </li>
                                                    )}
                                                    {journals.next_page_url && (
                                                        <li className="page-item">
                                                            <Link 
                                                                className="page-link" 
                                                                href={journals.next_page_url}
                                                            >
                                                                Next →
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-5">
                                <div className="mb-4" style={{ fontSize: '4rem' }}>📔</div>
                                <h3 className="h5 mb-3">No Journals Found</h3>
                                <p className="text-muted mb-4">
                                    {search ? 
                                        'No journals match your search criteria. Try a different search term.' :
                                        'You haven\'t written any journal entries yet. Start documenting your internship journey!'
                                    }
                                </p>
                                <Link
                                    href={route('journals.create')}
                                    className="btn btn-primary"
                                >
                                    ✍️ Write Your First Journal
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}