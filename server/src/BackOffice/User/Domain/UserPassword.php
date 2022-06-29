<?php

namespace Src\BackOffice\User\Domain;

use Src\Shared\Domain\ValueObject\StringValueObject;

class UserPassword extends StringValueObject
{
    public function __construct(string $value)
    {
        $this->ensureLengthHas8CharactersAtLeast($value);
        $this->ensureContainsOneUpperCaseLetter($value);
        $this->ensureContainsOneNumber($value);
        parent::__construct($value);
    }

    private function ensureLengthHas8CharactersAtLeast($value): void
    {
        if (strlen($value) < 8) {
            throw new \InvalidArgumentException('Password must have at least 8 characters');
        }
    }

    private function ensureContainsOneUpperCaseLetter($value): void
    {
        if (preg_match('/[A-Z]/', $value) === 0) {
            throw new \InvalidArgumentException('Password must contain at least one upper case letter');
        }
    }

    private function ensureContainsOneNumber($value): void
    {
        if (preg_match('/[0-9]/', $value) === 0) {
            throw new \InvalidArgumentException('Password must contain at least one number');
        }
    }
}
