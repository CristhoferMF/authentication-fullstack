<?php

namespace Src\BackOffice\Auth\Infrastructure\Authorization;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\BackOffice\Auth\Domain\AuthTokenAutorization;

final class AuthTokenJwtAutorization implements AuthTokenAutorization
{
    private Key $jwtKey;

    public function __construct(
        private string $key,
        private string $algorithm,
        private string $issuer,
        private string $audience,
        /** @var int
         *  Duration of the token in seconds
         */
        private int $ttl
    ) {
        if (Jwt::$supported_algs[$this->algorithm] === null) {
            throw new \Exception('Algorithm not supported');
        }
        $this->jwtKey = new Key($this->key, $this->algorithm);
    }

    private function generatePayload(mixed $subject, array $body): array
    {
        $payload = [
            'iss' => $this->issuer,
            'aud' => $this->audience,
            'sub' => $subject,
            'iat' => time(),
            'exp' => time() + $this->ttl,
        ];

        return array_merge($payload, $body);
    }

    public function encode(mixed $subject, array $body): string
    {
        return JWT::encode(
            $this->generatePayload($subject, $body),
            $this->key,
            $this->algorithm
        );
    }

    public function decode(string $token): array
    {
        return (array) JWT::decode(
            $token,
            $this->jwtKey
        );
    }
}
