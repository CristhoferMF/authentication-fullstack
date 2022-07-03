<?php

namespace Src\BackOffice\User\Application;

use Src\BackOffice\User\Domain\Exceptions\EmailAlreadyTaken;
use Src\BackOffice\User\Domain\User;
use Src\BackOffice\User\Domain\UserEmail;
use Src\BackOffice\User\Domain\UserId;
use Src\BackOffice\User\Domain\UserName;
use Src\BackOffice\User\Domain\UserPassword;
use Src\BackOffice\User\Domain\UserPasswordHashed;
use Src\BackOffice\User\Domain\UserPasswordHasher;
use Src\BackOffice\User\Domain\UserRepository;

final class UserRegistrator
{
    public function __construct(
        private UserPasswordHasher $hasher,
        private UserRepository $repository
    ) {
    }

    public function __invoke(
        UserName $userName,
        UserEmail $userEmail,
        UserPassword $password
    ): void {
        $this->ensureEmailIsNotTaken($userEmail);

        $passwordHashed = new UserPasswordHashed($this->hasher->make($password));

        $user = new User(
            UserId::random(),
            $userName,
            $userEmail,
            $passwordHashed
        );
        $this->repository->save($user);
    }

    private function ensureEmailIsNotTaken(UserEmail $email): void
    {
        if ($this->repository->emailIsTaken($email)) {
            throw new EmailAlreadyTaken($email);
        }
    }
}
