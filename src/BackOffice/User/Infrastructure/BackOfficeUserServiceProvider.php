<?php

namespace Src\BackOffice\User\Infrastructure;

use Illuminate\Support\ServiceProvider;
use Src\BackOffice\User\Domain\UserPasswordHasher;
use Src\BackOffice\User\Domain\UserRepository;
use Src\BackOffice\User\Infrastructure\Persistence\EloquentUserRepository;

final class BackOfficeUserServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UserRepository::class, EloquentUserRepository::class);
        $this->app->bind(UserPasswordHasher::class, BcryptUserPasswordHasher::class);
    }
}
