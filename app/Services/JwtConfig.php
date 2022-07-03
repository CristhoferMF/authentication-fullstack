<?php

namespace App\Services;

final class JwtConfig
{

    public function __construct(
        private string $secret,
        private string $algorithm,
        private int $ttl
    ) {
    }

    public function ttl(): int
    {
        return $this->ttl;
    }

    public function secret(): string
    {
        return $this->secret;
    }

    public function algorithm(): string
    {
        return $this->algorithm;
    }
}
