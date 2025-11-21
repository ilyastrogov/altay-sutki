<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['name', 'tel', 'date', 'owner'];
    protected $casts = [
        'date' => 'array',
    ];

    public function getDateAttribute($value)
    {
        return json_decode($value, true);
    }
}
