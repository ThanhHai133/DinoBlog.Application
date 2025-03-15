<?php

namespace App\Http\Controllers\API\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator; 

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json([$posts], 200);
    }

    public function create(Request $request)
    {
        if(!Auth::check())
        {
            return response()->json(['error'=>'You need to login to post!'], 401);
        }

         $validator = Validator::make($request->all(),
         [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags'=>'array',
         ]);

         if($validator->fails())
         {
            return response()->json(['error' => $validator->errors()], 422);
         }

         $posts = Post::create(
            [
                'title' => $request->title,
                'content' =>$request->content,
                'total_comment' => 0,
            ]);

          // Gán tags (nếu có)
            // if ($request->has('tags')) {
            //     $tagIds = [];
            //     foreach ($request->tags as $tagName) {
            //         $tag = Tag::firstOrCreate(['name' => $tagName]);
            //         $tagIds[] = $tag->id;
            //     }
            //     $post->tags()->sync($tagIds);
            // }

            return response()->json([
                'message' => 'creat post successfuly!',
                'post' => $posts->load('comments', 'votes', 'tags'),
            ], 201);
    }

    public function store()
    {

    }

    public function destroy()
    {

    }

}
