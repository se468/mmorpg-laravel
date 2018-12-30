@extends('layouts.app', [
    'centerContents' => true
])

@section('content')
<canvas id="game-screen" width="600" height="400"></canvas>
@endsection

@section('extra-javascript')
<script>
    let map = {!! json_encode($map, JSON_HEX_TAG) !!};
</script>
@endsection
