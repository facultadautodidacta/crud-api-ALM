<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;
use Mongodb\Laravel\Eloquent\Model;

class Libro extends Model
{
    protected $collection = 'libros';
    protected $connection = 'mongodb'; // Specify the MongoDB connection
    protected $fillable = [
        'titulo',
        'autor',
        'genero',
        'anio_publicacion'
    ];
}
