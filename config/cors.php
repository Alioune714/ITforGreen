<?php

return [

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'user/*', // 👈 ajoute ceci
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // 👈 ton frontend

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // 👈 très important avec Sanctum

];
