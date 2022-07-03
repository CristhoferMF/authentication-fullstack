<?php

namespace Src\BackOffice\Auth\Domain;

use Src\Shared\Domain\ValueObject\StringValueObject;

final class AuthPassword extends StringValueObject
{
    public function __construct(string $value)
    {
        $this->ensureLengthHas8CharactersAtLeast($value);
        parent::__construct($value);
    }

    public function isEquals(AuthPassword $other): bool
    {
        return $this->value() === $other->value();
    }

    private function ensureLengthHas8CharactersAtLeast($value): void
    {
        if (strlen($value) < 8) {
            throw new \InvalidArgumentException('Password must have at least 8 characters');
        }
    }
}
