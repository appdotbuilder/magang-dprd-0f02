<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\DewaAttendance
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $date
 * @property bool $is_present
 * @property int $marked_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $markedBy
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance query()
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance whereIsPresent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance whereMarkedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DewaAttendance today()
 * @method static \Database\Factories\DewaAttendanceFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DewaAttendance extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'dewan_attendances';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'date',
        'is_present',
        'marked_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'is_present' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who marked the attendance.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function markedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'marked_by');
    }

    /**
     * Scope a query to only include today's attendance.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('date', Carbon::today('Asia/Jakarta'));
    }
}