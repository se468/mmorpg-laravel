@extends('layouts.app')

@section('content')
<div class="container">
    <a href="{{ route('admin') }}">< Back to Admin</a>

    <h1>Tilesets</h1>
    

    
    <ul class="list-group">
    @foreach($tilesets as $tileset)
        <li class="list-group-item">
            <a href="{{ route('tileset.edit', ['id'=> $tileset->id]) }}">
                {{ $tileset->name }} 
            </a>
        </li>
    @endforeach
    </ul>

    <a href="#" data-toggle="modal" data-target="#form-modal">Create new Tileset</a>
    

</div>

<div class="modal fade" id="form-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form action="{{ route('tileset.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group">
                        <input type="file" name="photo" class="form-control-file">
                    </div>

                    <input type="submit" class="btn btn-primary btn-block">
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
