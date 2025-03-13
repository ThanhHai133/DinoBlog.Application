<?php

namespace App\Http\Controllers\API\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json([$posts], 200);
    }

    public function create()
    {

    }

    public function store()
    {

    }

    public function destroy()
    {

    }

}
