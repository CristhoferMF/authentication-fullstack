<?php

namespace Src\BackOffice\Auth\Application;

use Src\BackOffice\Auth\Domain\AuthRepository;
use Src\BackOffice\Auth\Domain\AuthTokenAutorization;
use Src\BackOffice\Auth\Domain\AuthUser;

final class AutorizationTokenGenerator
{
    public function __construct(
        private AuthRepository $repository,
        private AuthTokenAutorization $tokenAutorization
    ) {
    }

    public function __invoke(AuthUser $auth): string
    {
        $token = $this->tokenAutorization->encode(
            $auth->uuid()->value(),
            [
                'user' => [
                    'id' => $auth->id()->value(),
                    'uuid' => $auth->uuid()->value(),
                    'name' => $auth->name(),
                    'email' => $auth->userEmail()->value(),
                ],
            ]
        );
        return $token;
    }
}
