@extends('layouts.app')

@section('content')

<div class="container-fluid">
    <div class="d-block mt-2 mb-2">
        <a href="{{ route('map.index') }}">< Back</a>
        <div class="d-inline-block"> Map: {{ $map->name }}</div>
        
        <form action="{{ route('map.destroy', ['id' => $map->id]) }}" method="POST" class="d-inline">
            @csrf
            @method('DELETE')
            <input type="submit" value="Remove" class="btn btn-danger btn-sm">
        </form>
    </div>

    <mapmaker-component :map="{{ json_encode($map) }}"></mapmaker-component>
</div>
@endsection

@section('extra-javascript')
<script>
    window.loadGame = true;
    window.rawMapData = {!! json_encode($map, JSON_HEX_TAG) !!};
</script>
@endsection
