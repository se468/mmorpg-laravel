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
        //Create one layer when creating
        $map->layers()->create();
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
        $map->load(['tileset', 'tileset.tiles', 'layers']);

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
        $map->save();

        $map->layers()->delete();
        foreach($input['layersData'] as $layerData) {
            $layer = $map->layers()->create([
                'data' => $layerData['data'],
                'z_index' => $layerData['z_index']
            ]);
        }

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
        $map = Map::find($id);
        $map->layers()->delete();
        $map->delete();
        return redirect()->route('map.index')->with([
            'status' => 'Map has been deleted'
        ]);
    }
}
