<?php

namespace App\Http\Controllers;

use App\Map;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $map = Map::first();
        $map->load(['tileset', 'tileset.tiles', 'layers']);
        return view('home', [
            'map' => $map
        ]);
    }
}
