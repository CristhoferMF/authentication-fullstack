<?php

namespace Src\BackOffice\User\Domain\Exceptions;

use Exception;
use Src\BackOffice\User\Domain\UserEmail;
use Src\Shared\Domain\ApiErrorException;

final class EmailAlreadyTaken extends Exception implements ApiErrorException
{
    public function __construct(
        UserEmail $userEmail
    ) {
        parent::__construct(
            sprintf('Email "%s" is already taken', $userEmail->value()),
            409,
            parent::getPrevious()
        );
    }
}
