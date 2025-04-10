<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Connexion utilisateur
     */
    public function login(Request $request)
    {
        // Validation des champs
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Recherche de l'utilisateur
        $user = User::where('email', $request->email)->first();

        // Vérification du mot de passe
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        // Création du token avec Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Réponse
        return response()->json([
            'message' => 'Connexion réussie',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }
    public function register(Request $request)
{
    // Valider les données
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    // Créer l'utilisateur
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);

    // Créer un token
    $token = $user->createToken('auth_token')->plainTextToken;

    // Retourner les données
    return response()->json([
        'message' => 'Inscription réussie',
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => $user
    ]);
}

}
