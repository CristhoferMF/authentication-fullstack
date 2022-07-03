<?php

namespace Src\BackOffice\Auth\Domain;

interface AuthTokenAutorization
{
    public function encode(mixed $subject, array $body): string;
    public function decode(string $token): array;
}
