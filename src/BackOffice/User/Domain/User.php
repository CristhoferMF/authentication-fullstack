<?php

namespace Src\BackOffice\User\Domain;

final class User
{
    public function __construct(
        private UserId $id,
        private UserName $name,
        private UserEmail $email,
        private UserPasswordHashed $passwordHashed,
    ) {
    }

    /**
     * Get the value of id
     */
    public function id()
    {
        return $this->id;
    }

    /**
     * Get the value of userEmail
     */
    public function email()
    {
        return $this->email;
    }

    /**
     * Get the value of passwordHashed
     */
    public function passwordHashed()
    {
        return $this->passwordHashed;
    }

    /**
     * Get the value of userName
     */
    public function name()
    {
        return $this->name;
    }
}
