<?php

namespace Src\BackOffice\Auth\Infrastructure\Http;

use Request;
use Src\BackOffice\Auth\Application\AuthResponse;
use Src\BackOffice\Auth\Application\AutorizationTokenGenerator;
use Src\BackOffice\Auth\Application\UserAutenticator;
use Src\BackOffice\Auth\Domain\AuthPassword;
use Src\BackOffice\Auth\Domain\AuthUserEmail;

final class AuthPostController
{

    public function __construct(
        protected UserAutenticator $userAutenticator,
        protected AutorizationTokenGenerator $tokenGenerator
    ) {
    }

    public function __invoke(
        string $userEmail,
        string $userPassword,
    ): AuthResponse {
        $email    = new AuthUserEmail($userEmail);
        $password = new AuthPassword($userPassword);

        $auth = $this->userAutenticator->__invoke($email, $password);
        $token = $this->tokenGenerator->__invoke($auth);

        return new AuthResponse($auth, $token);
    }
}
