<?php

namespace Src\BackOffice\Auth\Domain;

use Src\Shared\Domain\ValueObject\StringValueObject;

final class AuthUserEmail extends StringValueObject
{
    public function __construct(string $value)
    {
        $this->ensureIsValidEmailAddress($value);
        parent::__construct($value);
    }

    private function ensureIsValidEmailAddress($value): void
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Email address is not valid');
        }
    }
}
