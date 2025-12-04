<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variation extends Model
{
    protected $guarded = ['id'];

    public function variation_items()
    {
        return $this->hasMany(VariationItem::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}
