<?php

namespace Src\BackOffice\Auth\Application;

use Src\BackOffice\Auth\Domain\AuthUser;

final class AuthResponse
{
    public function __construct(
        private AuthUser $authUser,
        private string $token
    ) {
    }

    public function toArray(): array
    {
        return [
            'user' => [
                'id' => $this->authUser->id()->value(),
                'uuid' => $this->authUser->uuid()->value(),
                'name' => $this->authUser->name(),
                'email' => $this->authUser->userEmail()->value(),
            ],
            'token' => $this->token,
        ];
    }
}
