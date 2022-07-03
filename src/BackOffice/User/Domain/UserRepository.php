<?php

namespace Src\BackOffice\User\Domain;

interface UserRepository
{
    public function find(UserId $id): ?User;
    public function save(User $user): void;

    public function emailIsTaken(UserEmail $email): bool;
}
