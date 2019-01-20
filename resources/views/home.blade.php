@extends('layouts.app', ['hideNavBar' => true,'isGameScreen' => true])

@section('content')
<game-component :user="{{ json_encode(auth()->user()) }}"></game-component>
@endsection

@section('extra-javascript')
<script>
    window.loadGame = true;
    window.rawMapData = {!! json_encode($map, JSON_HEX_TAG) !!};
</script>
@endsection
