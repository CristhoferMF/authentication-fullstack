<?php

namespace Src\BackOffice\Auth\Domain\Exceptions;

use Exception;
use Src\Shared\Domain\ApiErrorException;

final class InvalidCredentials extends Exception implements ApiErrorException
{
    public function __construct(
        string $password
    ) {
        parent::__construct(
            'Credentials are invalid',
            400,
            parent::getPrevious()
        );
    }
}
