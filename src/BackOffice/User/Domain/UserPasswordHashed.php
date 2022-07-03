<?php

namespace Src\BackOffice\User\Domain;

use Src\Shared\Domain\ValueObject\StringValueObject;

final class UserPasswordHashed extends StringValueObject
{
    public function __construct(string $value)
    {
        parent::__construct($value);
    }
}
