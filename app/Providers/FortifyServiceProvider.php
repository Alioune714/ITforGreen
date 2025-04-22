<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Fortify;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 🔐 Crée l’utilisateur via l’action définie
        Fortify::createUsersUsing(CreateNewUser::class);

        // 🔄 Mise à jour du profil et du mot de passe
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        // ✅ Route personnalisée pour l’authentification
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where('email', $request->email)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                return $user;
            }

            // (Facultatif) — pour retourner un message personnalisé
            // throw ValidationException::withMessages([
            //     Fortify::username() => 'Les identifiants sont incorrects.',
            // ]);
        });

        // 🛡️ Limitation de tentatives (login)
        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->input(Fortify::username());
            return Limit::perMinute(5)->by(Str::lower($email) . '|' . $request->ip());
        });

        // 🔐 Limite pour 2FA (totp)
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
