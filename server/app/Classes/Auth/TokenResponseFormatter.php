<?php

namespace App\Classes\Auth;

use App\Models\User;
use App\Services\JwtConfig;
use Carbon\Carbon;

final class TokenResponseFormatter
{
    public function __construct(
        private JwtAuthTokenCreator $tokenCreator,
        private User $user,
    ) {
    }

    public function toArray(): array
    {
        return [
            'user' => $this->user->toArray(),
            'tokens' => [
                'access' => [
                    'token' => $this->tokenCreator->token(),
                    'expires' => Carbon::createFromTimestamp($this->tokenCreator->payload()['exp']),
                ],
            ],
        ];
    }
}
