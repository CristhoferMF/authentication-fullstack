<?php

namespace Src\BackOffice\Auth\Domain;

final class AuthUser
{
    public function __construct(
        private AuthUserId $id,
        private AuthUserUuid $uuid,
        private AuthUserEmail $userEmail,
        private AuthPassword $userPassword,
        private string $name
    ) {
    }

    public function passwordMatches(AuthPassword $userPassword): bool
    {
        return $this->userPassword->isEquals($userPassword);
    }

    public function userEmail(): AuthUserEmail
    {
        return $this->userEmail;
    }

    public function userPassword(): AuthPassword
    {
        return $this->userPassword;
    }

    public function id(): AuthUserId
    {
        return $this->id;
    }

    public function name(): string
    {
        return $this->name;
    }

    /**
     * Get the value of uuid
     */
    public function uuid()
    {
        return $this->uuid;
    }
}
