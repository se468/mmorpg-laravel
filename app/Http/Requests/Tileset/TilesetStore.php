<?php

namespace App\Http\Requests\Tileset;

use App\Tileset;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;

class TilesetStore extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'photo' => 'required|file|mimes:jpeg,bmp,png'
        ];
    }

    public function persist () {
        $file = $this->file('photo');
        $path = Storage::putFile('public', $file, 'public');
        
        $image = Image::make($file);
        $tileset = Tileset::create([
            'name' => $this->file('photo')->getClientOriginalName(),
            'url' => Storage::url($path),
            'image_width' => $image->width(),
            'image_height' => $image->height(),
            'horizontal_length' => 1,
            'vertical_length' => 1,
            'type' => ''
        ]);

        return $tileset;
    }
}