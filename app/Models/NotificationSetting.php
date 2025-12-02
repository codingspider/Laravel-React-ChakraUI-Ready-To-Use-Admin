<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationSetting extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'settings' => 'array', // automatically cast JSON to array
        'is_active' => 'boolean',
    ];
}
