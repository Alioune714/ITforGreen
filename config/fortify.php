<?php

use Laravel\Fortify\Features;

return [

    /*
    |--------------------------------------------------------------------------
    | Fortify Guard
    |--------------------------------------------------------------------------
    */
    'guard' => 'web',

    /*
    |--------------------------------------------------------------------------
    | Password Broker
    |--------------------------------------------------------------------------
    */
    'passwords' => 'users',

    /*
    |--------------------------------------------------------------------------
    | Username Field
    |--------------------------------------------------------------------------
    */
    'username' => 'email',
    'email' => 'email',

    /*
    |--------------------------------------------------------------------------
    | Lowercase Usernames
    |--------------------------------------------------------------------------
    */
    'lowercase_usernames' => true,

    /*
    |--------------------------------------------------------------------------
    | Redirect After Login
    |--------------------------------------------------------------------------
    */
    'home' => '/dashboard', // ou '/landing' selon ton frontend

    /*
    |--------------------------------------------------------------------------
    | Fortify Routes Prefix / Subdomain
    |--------------------------------------------------------------------------
    */
    'prefix' => '', // aucune URL supplémentaire
    'domain' => null,

    /*
    |--------------------------------------------------------------------------
    | Middleware
    |--------------------------------------------------------------------------
    */
    'middleware' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Rate Limiting
    |--------------------------------------------------------------------------
    */
    'limiters' => [
        'login' => 'login',
        'two-factor' => 'two-factor',
    ],

    /*
    |--------------------------------------------------------------------------
    | Register View Routes
    |--------------------------------------------------------------------------
    */
    'views' => false, // false car on gère tout côté React (SPA)

    /*
    |--------------------------------------------------------------------------
    | Fortify Features
    |--------------------------------------------------------------------------
    */
    'features' => [
        Features::registration(),
        Features::resetPasswords(),
        Features::emailVerification(), // Active si tu veux que l'e-mail soit vérifié avant accès
        Features::updateProfileInformation(),
        Features::updatePasswords(),
        Features::twoFactorAuthentication([
            'confirm' => true,           // Demande de confirmer avec un code 2FA après activation
            'confirmPassword' => true,  // Re-demande le mot de passe pour activer ou désactiver 2FA
            // 'window' => 0,           // Délai d’acceptation si besoin (facultatif)
        ]),
    ],
];
