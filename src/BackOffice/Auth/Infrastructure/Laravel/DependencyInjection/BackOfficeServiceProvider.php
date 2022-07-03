<?php

namespace Src\BackOffice\Auth\Infrastructure\Laravel\DependencyInjection;

use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;
use Src\BackOffice\Auth\Application\AutorizationTokenGenerator;
use Src\BackOffice\Auth\Application\UserAutenticator;
use Src\BackOffice\Auth\Domain\AuthRepository;
use Src\BackOffice\Auth\Domain\AuthTokenAutorization;
use Src\BackOffice\Auth\Infrastructure\Authorization\AuthTokenJwtAutorization;
use Src\BackOffice\Auth\Infrastructure\Http\AuthPostController;
use Src\BackOffice\Auth\Infrastructure\LaravelHashingUserPasswordHasher;
use Src\BackOffice\Auth\Infrastructure\Persistence\EloquentAuthRepository;

class BackOfficeServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(AuthRepository::class, EloquentAuthRepository::class);
        $this->app->bind(AuthTokenAutorization::class, function () {
            return new AuthTokenJwtAutorization(
                config('jwt.secret'),
                config('jwt.algorithm'),
                config('jwt.issuer'),
                config('jwt.audience'),
                config('jwt.ttl')
            );
        });
        $this->app->bind(AutorizationTokenGenerator::class, function () {
            return new AutorizationTokenGenerator(
                $this->app->make(AuthRepository::class),
                $this->app->make(AuthTokenAutorization::class)
            );
        });

        $this->app->bind(UserAutenticator::class, function () {
            return new UserAutenticator(
                $this->app->make(AuthRepository::class),
                new LaravelHashingUserPasswordHasher(),
                $this->app->make(AuthTokenAutorization::class)
            );
        });
    }
}
