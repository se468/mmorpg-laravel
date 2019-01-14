<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    protected $guarded = [];

    public function map () {
        return $this->belongsTo('App\Map');
    }
}
