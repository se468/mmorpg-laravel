<?php

namespace App\Http\Controllers;

use App\Layer;
use Illuminate\Http\Request;

class LayerController extends Controller
{
    public function store(Request $request)
    {
        $input = $request->all();

        $layer = Layer::create($input);
        return redirect()->back()->with([
            'status' => 'Layer Created'
        ]);
    }

    public function update(Request $request, $id) {
        $input = $request->all();

        $layer = Layer::find($id);
        if($layer) {
            $layer->z_index = $input['z_index'];
            $layer->save();

            return response()->json([
                'status' => 'Layer has been saved!'
            ]);
        }
        else {
            return response()->json([
                'status' => 'Save map before modifying layer!'
            ]);
        }
    }
}
