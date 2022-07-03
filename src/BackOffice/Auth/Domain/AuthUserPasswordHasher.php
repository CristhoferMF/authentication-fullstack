<?php

namespace Src\BackOffice\Auth\Domain;

use Src\BackOffice\Auth\Domain\AuthPassword;

interface AuthUserPasswordHasher
{
    public function check(AuthPassword $password, string $hash): bool;
}
