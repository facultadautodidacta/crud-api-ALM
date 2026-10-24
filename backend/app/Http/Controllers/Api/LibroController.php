<?php

namespace App\Http\Controllers\Api;
use App\Models\Libro;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LibroController extends Controller
{
    public function index()
    {
        $libros = Libro::all(); // Obtiene todos los libros
        return response()->json($libros, 200); // Retorna JSON con código 200 (OK)
    }
    public function store(Request $request)
    {
        // Valida los datos recibidos (según tu migración)
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',      // Título obligatorio
            'autor' => 'required|string|max:255',       // Autor obligatorio
            'genero' => 'nullable|string|max:255',      // Género opcional
            'anio_publicacion' => 'nullable|integer',   // Año opcional, debe ser número
        ]);
        
        // Crea el libro en la base de datos
        $libro = Libro::create($validated);
        
        // Retorna el libro creado con código 201 (Created)
        return response()->json($libro, 201);
    }
    public function show($id)
    {
        // Busca el libro por ID, si no existe retorna error 404 automáticamente
        $libro = Libro::findOrFail($id);
        
        // Retorna el libro encontrado con código 200 (OK)
        return response()->json($libro, 200);
    }
    public function update(Request $request, $id)
    {
        // Busca el libro, si no existe retorna 404
        $libro = Libro::findOrFail($id);
        
        // Valida los datos (todos opcionales porque puedes actualizar solo algunos campos)
        $validated = $request->validate([
            'titulo' => 'string|max:255',           // Título opcional
            'autor' => 'string|max:255',            // Autor opcional
            'genero' => 'nullable|string|max:255',  // Género opcional
            'anio_publicacion' => 'nullable|integer', // Año opcional
        ]);
        
        // Actualiza el libro con los nuevos datos
        $libro->update($validated);
        
        // Retorna el libro actualizado con código 200 (OK)
        return response()->json($libro, 200);
    }
    public function destroy($id)
    {
        // Busca el libro, si no existe retorna 404
        $libro = Libro::findOrFail($id);
        
        // Elimina el libro de la base de datos
        $libro->delete();
        
        // Retorna respuesta vacía con código 204 (No Content)
        return response()->json(null, 204);
    }
}
