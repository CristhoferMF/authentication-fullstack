<?php

namespace Src\BackOffice\Auth\Domain;

interface AuthRepository
{
    public function search(AuthUserEmail $userEmail): ?AuthUser;
}
