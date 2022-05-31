<?php

namespace App\Providers;

use App\Classes\Auth\JwtAuthTokenCreator;
use App\Classes\Auth\TokenResponseFormatter;
use App\Services\Auth\JwtGuard;
use App\Services\JwtConfig;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Auth::extend('jwt', function ($app, $name, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\Guard...
            return new JwtGuard(
                Auth::createUserProvider($config['provider']),
                $app->request,
                new JwtConfig(
                    config('jwt.secret'),
                    config('jwt.algorithm'),
                    config('jwt.ttl'),
                )
            );
        });
        $this->app->bind(JwtAuthTokenCreator::class, function ($app, $params) {
            return new JwtAuthTokenCreator(
                new JwtConfig(
                    config('jwt.secret'),
                    config('jwt.algorithm'),
                    config('jwt.ttl'),
                ),
                $params['user']
            );
        });
        //
    }
}
