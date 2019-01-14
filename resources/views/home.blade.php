@extends('layouts.app')

@section('content')
<game-component></game-component>

@endsection

@section('extra-javascript')
<script>
    window.loadGame = true;
    window.rawMapData = {!! json_encode($map, JSON_HEX_TAG) !!};
</script>
@endsection
