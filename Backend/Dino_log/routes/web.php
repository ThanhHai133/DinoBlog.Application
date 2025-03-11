<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AdminController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

Route::get('user',[AdminController::class, 'index'])->name('show.users');