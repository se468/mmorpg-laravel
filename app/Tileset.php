<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tileset extends Model
{
    protected $guarded = [];

    public function tiles () {
        return $this->hasMany('App\Tile');
    }
}
