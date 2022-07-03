<?php

namespace Src\BackOffice\User\Domain;

interface UserPasswordHasher
{
    public function make(UserPassword $userPassword): string;
}
