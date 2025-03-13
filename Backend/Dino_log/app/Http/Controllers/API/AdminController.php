<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminController extends Controller
{
    public function showUser()
    {
        $users = User::all();
        return response()->json($users);  
    }
}
