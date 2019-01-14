<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    protected $guarded = [];

    public function tileset () {
        return $this->belongsTo('App\Tileset');
    }

    public function layers () {
        return $this->hasMany('App\Layer');
    }
}
