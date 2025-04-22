<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1'); // max 5 tentatives par minute
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
