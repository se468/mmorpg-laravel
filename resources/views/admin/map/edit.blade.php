@extends('layouts.app')

@section('content')
<div class="container">
    <a href="{{ route('tileset.index') }}">< Back</a>

    <h1>{{ $map->name }} Edit
    
        <form action="{{ route('map.destroy', ['id' => $map->id]) }}" method="POST" class="float-right">
            @csrf
            @method('DELETE')
            <input type="submit" value="Remove" class="btn btn-danger">
        </form>
    </h1>

    <mapmaker-component :map="{{ json_encode($map) }}"></mapmaker-component>
    
</div>
@endsection