<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\Mood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JournalController extends Controller
{
    /**
     * Display a listing of the user's journals.
     */
    public function index(Request $request)
    {
        $journals = Journal::where('user_id', $request->user()->id)
            ->with('mood')
            ->when($request->search, function ($query, $search) {
                return $query->where('content', 'like', "%{$search}%");
            })
            ->latest('date')
            ->paginate(10);

        return Inertia::render('journals/index', [
            'journals' => $journals,
            'search' => $request->search,
        ]);
    }

    /**
     * Show the form for creating a new journal.
     */
    public function create()
    {
        $moods = Mood::all();

        return Inertia::render('journals/create', [
            'moods' => $moods,
        ]);
    }

    /**
     * Store a newly created journal.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'content' => 'required|string',
            'mood_id' => 'nullable|exists:moods,id',
            'attachment' => 'nullable|file|max:10240|mimes:jpg,jpeg,png,pdf,doc,docx',
        ]);

        $data = [
            'user_id' => $request->user()->id,
            'date' => $request->date,
            'content' => $request->content,
            'mood_id' => $request->mood_id,
        ];

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('journal-attachments', 'public');
        }

        Journal::create($data);

        return redirect()->route('journals.index')
            ->with('success', 'Journal entry created successfully!');
    }

    /**
     * Display the specified journal.
     */
    public function show(Journal $journal)
    {
        $user = request()->user();
        if ($journal->user_id !== $user->id && !$user->isAdmin()) {
            abort(403);
        }

        $journal->load('mood');

        return Inertia::render('journals/show', [
            'journal' => $journal,
        ]);
    }

    /**
     * Show the form for editing the specified journal.
     */
    public function edit(Journal $journal)
    {
        $user = request()->user();
        if ($journal->user_id !== $user->id) {
            abort(403);
        }

        $journal->load('mood');
        $moods = Mood::all();

        return Inertia::render('journals/edit', [
            'journal' => $journal,
            'moods' => $moods,
        ]);
    }

    /**
     * Update the specified journal.
     */
    public function update(Request $request, Journal $journal)
    {
        $user = $request->user();
        if ($journal->user_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'content' => 'required|string',
            'mood_id' => 'nullable|exists:moods,id',
            'attachment' => 'nullable|file|max:10240|mimes:jpg,jpeg,png,pdf,doc,docx',
        ]);

        $data = [
            'content' => $request->content,
            'mood_id' => $request->mood_id,
        ];

        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($journal->attachment) {
                Storage::disk('public')->delete($journal->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('journal-attachments', 'public');
        }

        $journal->update($data);

        return redirect()->route('journals.show', $journal)
            ->with('success', 'Journal entry updated successfully!');
    }

    /**
     * Remove the specified journal.
     */
    public function destroy(Journal $journal)
    {
        $user = request()->user();
        if ($journal->user_id !== $user->id) {
            abort(403);
        }

        // Delete attachment if exists
        if ($journal->attachment) {
            Storage::disk('public')->delete($journal->attachment);
        }

        $journal->delete();

        return redirect()->route('journals.index')
            ->with('success', 'Journal entry deleted successfully!');
    }
}