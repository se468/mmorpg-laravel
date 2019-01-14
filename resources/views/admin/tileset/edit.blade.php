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

    <tileset-edit-component :tileset="{{ json_encode($tileset) }}"></tileset-edit-component>
    
</div>
@endsection
