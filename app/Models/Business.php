<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $guarded = ['id'];

    protected $table = 'business';
    
    protected $casts = [
        'ref_no_prefixes' => 'array',
        'keyboard_shortcuts' => 'array',
    ];
}
