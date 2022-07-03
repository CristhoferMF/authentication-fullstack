<?php

namespace Src\BackOffice\Auth\Application;

use Src\BackOffice\Auth\Domain\AuthPassword;
use Src\BackOffice\Auth\Domain\AuthRepository;
use Src\BackOffice\Auth\Domain\AuthTokenAutorization;
use Src\BackOffice\Auth\Domain\AuthUser;
use Src\BackOffice\Auth\Domain\AuthUserEmail;
use Src\BackOffice\Auth\Domain\AuthUserPasswordHasher;
use Src\BackOffice\Auth\Domain\Exceptions\InvalidCredentials;

final class UserAutenticator
{

    public function __construct(
        private AuthRepository $repository,
        private AuthUserPasswordHasher $hasher,
        private AuthTokenAutorization $authTokenAutorization
    ) {
    }

    public function __invoke(AuthUserEmail $email, AuthPassword $password): AuthUser
    {
        $auth = $this->repository->search($email);
        $this->ensureUserExists($auth);
        $this->ensureCredentialsAreValid($auth, $password);
        return $auth;
    }

    private function ensureUserExists(?AuthUser $auth): void
    {
        if (is_null($auth)) {
            // InvalidaAuthUserEmail
            throw new \Exception('User does not exist');
        }
    }

    private function ensureCredentialsAreValid(AuthUser $auth, AuthPassword $password): void
    {
        if (false === $this->hasher->check($password, $auth->userPassword()->value())) {
            throw new InvalidCredentials($password->value());
        }
    }
}
