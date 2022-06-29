<?php

namespace Src\BackOffice\User\Infrastructure;

use Illuminate\Hashing\BcryptHasher;
use Src\BackOffice\User\Domain\UserPassword;
use Src\BackOffice\User\Domain\UserPasswordHasher;

class BcryptUserPasswordHasher implements UserPasswordHasher
{
    public function make(UserPassword $userPassword): string
    {
        $bcrypt = new BcryptHasher;
        return $bcrypt->make($userPassword->value());
    }
}
