<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Mood
 *
 * @property int $id
 * @property string $name
 * @property string $icon
 * @property string $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Attendance> $attendances
 * @property-read int|null $attendances_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Journal> $journals
 * @property-read int|null $journals_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Mood newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Mood newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Mood query()
 * @method static \Illuminate\Database\Eloquent\Builder|Mood whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Mood whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Mood whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Mood whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Mood whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Mood whereUpdatedAt($value)
 * @method static \Database\Factories\MoodFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Mood extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'icon',
        'color',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the attendances for the mood.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    /**
     * Get the journals for the mood.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function journals(): HasMany
    {
        return $this->hasMany(Journal::class);
    }
}