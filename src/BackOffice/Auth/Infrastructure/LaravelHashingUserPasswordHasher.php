<?php

namespace Src\BackOffice\Auth\Infrastructure;

use Illuminate\Support\Facades\Hash;
use Src\BackOffice\Auth\Domain\AuthPassword;
use Src\BackOffice\Auth\Domain\AuthUserPasswordHasher;

final class LaravelHashingUserPasswordHasher implements AuthUserPasswordHasher
{

    public function check(AuthPassword $password, string $hash): bool
    {
        return Hash::check($password->value(), $hash);
    }
}
