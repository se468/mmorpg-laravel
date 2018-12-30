<?php

namespace App\Http\Controllers;

use App\Tile;
use App\Tileset;
use Illuminate\Http\Request;
use App\Http\Requests\Tileset\TilesetStore;

class TilesetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tilesets = Tileset::all();
        return view ('admin.tileset.index', [
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
    public function store(TilesetStore $form)
    {
        $result = $form->persist();

        return redirect()->back()->with([
            'status' => 'Tileset has been created',
            'tileset' => $result
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
        $tileset = Tileset::find($id);
        return view('admin.tileset.edit', [
            'tileset' => $tileset
        ]);
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


        $tileset = Tileset::find($id);
        $tileset->update($input);

        $tileset->tiles()->delete();

        for($x = 0; $x < $input['horizontal_length']; $x ++) {
            for($y = 0; $y < $input['vertical_length']; $y ++) {
                $tile = Tile::create([
                    'tileset_id' => $tileset->id,
                    'x' => $x,
                    'y' => $y
                ]);
            }
        }

        return redirect()->back()->with([
            'status' => 'Tileset has been updated'
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
        Tileset::find($id)->delete();

        return redirect()->route('tileset.index')->with([
            'status' => 'Tileset has been deleted'
        ]);
    }
}
