<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Auth\Events\Registered;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('user',[AdminController::class, 'index'])->name('show.users');

Route::prefix('auth')->group(function() {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

//Route for only admin
Route::middleware(['auth:sanctum', \App\Http\Middleware\CheckRole::class])->group(function()
{
    Route::get('/admin/user', [AdminController::class ,'showUser']);
});

//Route for admin and user
Route::middleware('auth:sanctum')->group(function()
{
    Route::get('/post', );
});
