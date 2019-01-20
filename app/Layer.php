<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Layer extends Model
{
    protected $guarded = [];
    protected $appends = array('data');

    public function map () {
        return $this->belongsTo('App\Map');
    }

    public function getDataAttribute () {
        $data = Storage::get($this->url);
        return $data;
    }
}
