@php 
$targetRoute = ($mode == 'edit') ? route('tileset.update', ['id' => $formTileset->id]) : route('tileset.store');
@endphp

<form action="{{ $targetRoute }}" method="POST">
    @csrf
    @if($mode == 'edit')
        @method('PUT')
        <input type="hidden" name="id" value="{{ $formTileset->id }}">
    @endif

    <div class="form-group">
        <label>Name</label>
        <input type="text" name="name" class="form-control" 
            @if(isset($formTileset))value="{{ $formTileset->name }}"@endif>
    </div>

    <div class="form-group">
        <label>Url</label>

        <input type="text" name="url" class="form-control"
            @if(isset($formTileset))value="{{ $formTileset->url }}"@endif>
    </div>
    <hr>
    <div class="form-group">
        <label>Image Width</label>
        <input type="text" name="image_width" class="form-control"
            @if(isset($formTileset))value="{{ $formTileset->image_width }}"@endif>
    </div>

    <div class="form-group">
        <label>Image Height</label>
        <input type="text" name="image_height" class="form-control"
            @if(isset($formTileset))value="{{ $formTileset->image_height }}"@endif>
    </div>
    <hr>

    <div class="form-group">
        <label>Horizontal Length</label>
        <input type="text" name="horizontal_length" class="form-control"
            @if(isset($formTileset))value="{{ $formTileset->horizontal_length }}"@endif>
    </div>

    <div class="form-group">
        <label>Vertical Length</label>
        <input type="text" name="vertical_length" class="form-control"
            @if(isset($formTileset))value="{{ $formTileset->vertical_length }}"@endif>
    </div>

    <hr>

    <div class="form-group">
        <select name="type" class="form-control">
            <option value="map" @if(isset($formTileset) && $formTileset->type == 'map') selected @endif>Map</option>
            <option value="character" @if(isset($formTileset) && $formTileset->type == 'character') selected @endif>Character</option>
            <option value="item" @if(isset($formTileset) && $formTileset->type == 'item') selected @endif>Item</option>
        </select>
    </div>
    <input type="submit" class="btn btn-primary" value="Submit">
</form>