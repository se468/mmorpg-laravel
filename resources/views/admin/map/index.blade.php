@extends('layouts.app')

@section('content')
<div class="container">
    <a href="{{ route('admin') }}">< Back to Admin</a>

    <h1>Map</h1>
    

    
    <ul class="list-group">
    @foreach($maps as $map)
        <li class="list-group-item">
            <a href="{{ route('map.edit', ['id'=> $map->id]) }}">
                {{ $map->name }} 
            </a>
        </li>
    @endforeach
    </ul>

    <a href="#" data-toggle="modal" data-target="#form-modal">Create new Map</a>
    

</div>

<div class="modal fade" id="form-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form action="{{ route('map.store') }}" method="POST">
                    @csrf
                    <div class="form-group">
                        <select name="tileset_id">
                            @foreach($tilesets as $tileset)
                            <option value="{{ $tileset->id }}">{{ $tileset->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" name="name" class="form-control" placeholder="Map Name">
                    </div>

                    <div class="form-group">
                        <input type="text" name="width" class="form-control" placeholder="Map width (by number of grids)">
                    </div>

                    <div class="form-group">
                        <input type="text" name="height" class="form-control" placeholder="Map height (by number of grids)">
                    </div>

                    <input type="submit" class="btn btn-primary btn-block">
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
