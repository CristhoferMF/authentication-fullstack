<?php

namespace Src\Shared\Domain\ValueObject;

use Src\Shared\Domain\ValueObject\StringValueObject;

abstract class Email extends StringValueObject
{
    public function __construct(string $value)
    {
        $this->ensureIsValidEmailAddress($value);
        parent::__construct($value);
    }

    private function ensureIsValidEmailAddress($value): void
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException(sprintf('"%s" is not a valid email address.', $value));
        }
    }
}
