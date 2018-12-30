<?php

namespace App\Http\Controllers;

use App\Map;
use App\Tileset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tilesets = Tileset::all();
        $maps = Map::all();
        return view('admin.map.index', [
            'maps' => $maps,
            'tilesets' => $tilesets
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $map = Map::create($input);

        return redirect()->back()->with([
            'status' => 'Map Created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $map = Map::find($id);
        $map->load(['tileset', 'tileset.tiles']);

        return view('admin.map.edit', ['map' => $map]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $map = Map::find($id);
        $map->data = $input['mapData'];
        $map->save();
        return response()->json([
            'status' => 'Map has been saved!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Map::find($id)->delete();

        return redirect()->route('map.index')->with([
            'status' => 'Map has been deleted'
        ]);
    }
}
