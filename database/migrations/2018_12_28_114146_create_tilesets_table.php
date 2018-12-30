<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTilesetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tilesets', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->default('');

            $table->string('url')->default('');
            
            $table->integer('image_width')->default(0);
            $table->integer('image_height')->default(0);
            $table->integer('horizontal_length')->default(1);
            $table->integer('vertical_length')->default(1);

            $table->string('type')->default(''); //map, character, item

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tilesets');
    }
}
