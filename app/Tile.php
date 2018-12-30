<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tile extends Model
{
    protected $guarded = [];

    public function tileset () {
        return $this->belongsTo('App\Tileset');
    }

    public function width() {
        return $this->tileset->image_width/$this->tileset->horizontal_length;
    }

    public function height() {
        return $this->tileset->image_height/$this->tileset->vertical_length;
    }
}
