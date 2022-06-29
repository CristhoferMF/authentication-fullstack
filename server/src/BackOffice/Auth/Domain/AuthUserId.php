<?php

namespace Src\BackOffice\Auth\Domain;

use Src\Shared\Domain\ValueObject\IntegerValueObject;

final class AuthUserId extends IntegerValueObject
{
    public function __construct(int $value)
    {
        $this->ensureIsValidId($value);
        parent::__construct($value);
    }

    private function ensureIsValidId(int $value): void
    {
        if ($value <= 0) {
            throw new \InvalidArgumentException('Id is not valid');
        }
    }
}
