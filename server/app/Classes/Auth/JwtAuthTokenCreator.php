<?php

namespace App\Classes\Auth;

use App\Models\User;
use App\Services\JwtConfig;
use Exception;

final class JwtAuthTokenCreator
{
    private array $payload;
    private string  $token;

    public function __construct(
        private JwtConfig $jwtConfig,
        private User $user
    ) {
    }

    public function payload(): array
    {
        return $this->payload;
    }

    public function token()
    {
        if (empty($this->token)) {
            $this->token = $this->create();
        }
        return $this->token;
    }

    private function create(): string
    {
        if (empty($this->user)) {
            throw new Exception('User is not set');
        }
        $this->payload = [
            'iss' => $this->user->id,
            'iat' => now()->unix(),
            'exp' => now()->addSeconds($this->jwtConfig->ttl())->unix(),
        ];
        return \Firebase\JWT\JWT::encode(
            $this->payload,
            $this->jwtConfig->secret(),
            $this->jwtConfig->algorithm()
        );
    }
}
