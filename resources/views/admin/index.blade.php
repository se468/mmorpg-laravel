@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Admin Page</h1>
    <div>
        <a href="{{ route('tileset.index') }}">Edit Tilesets</a>
    </div>
    <div>
        <a href="{{ route('map.index') }}">Edit Maps</a>
    </div>
</div>



@endsection
