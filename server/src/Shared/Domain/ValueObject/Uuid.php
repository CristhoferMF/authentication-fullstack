<?php

namespace Src\Shared\Domain\ValueObject;

use Src\Shared\Domain\UuidGenerator;

abstract class Uuid extends StringValueObject
{
    public function __construct(string $value)
    {
        $this->ensureIsValidUuid($value);
        parent::__construct($value);
    }

    public static function random(): self
    {
        return new static(app(UuidGenerator::class)->random());
    }

    private function ensureIsValidUuid(string $value)
    {
        if (app(UuidGenerator::class)->isValid($value) === false) {
            throw new \InvalidArgumentException(sprintf('"%s" is not a valid UUID.', $value));
        }
    }
}
