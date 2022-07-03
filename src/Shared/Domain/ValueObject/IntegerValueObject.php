<?php

namespace Src\Shared\Domain\ValueObject;

abstract class IntegerValueObject
{
    public function __construct(protected int $value)
    {
    }

    public function value(): int
    {
        return $this->value;
    }
}
