<?php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
| Ces routes utilisent le middleware "web", incluant sessions, CSRF,
| et tout ce qu’il faut pour la vérification par email, notifications, etc.
*/

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenue sur Laravel 👋']);
});

/**
 * 🔐 Page affichée quand un utilisateur non vérifié tente d’accéder à une page protégée
 */
Route::get('/email/verify', function () {
    return response()->json(['message' => 'Merci de vérifier votre adresse e-mail.']);
})->middleware('auth')->name('verification.notice');

/**
 * ✅ Lien cliquable dans l’e-mail envoyé
 */
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill(); // Marque l’utilisateur comme "vérifié"
    return redirect('http://localhost:5173/login?verified=1'); // Redirige vers le frontend
})->middleware(['auth', 'signed'])->name('verification.verify');

/**
 * 🔁 Renvoyer le lien de vérification — appelé depuis React
 */
Route::middleware(['auth', 'throttle:6,1'])->post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Lien de vérification envoyé !']);
})->name('verification.send');
