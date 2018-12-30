@extends('layouts.app')

@section('content')
<div class="container">
    <a href="{{ route('tileset.index') }}">< Back</a>

    <h1>{{ $tileset->name }} Edit
    
        <form action="{{ route('tileset.destroy', ['id' => $tileset->id]) }}" method="POST" class="float-right">
            @csrf
            @method('DELETE')
            <input type="submit" value="Remove" class="btn btn-danger">
        </form>
    </h1>

    <div class="row">
        <div class="col-md-6">
            @include('admin.tileset.form', [
                'mode' => 'edit',
                'formTileset' => $tileset
            ])
        </div>
        <div class="col-md-6">
            <img src="{{ $tileset->url }}" class="img-fluid">
        </div>
    </div>
    
</div>
@endsection
