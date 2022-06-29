<?php

namespace Src\BackOffice\Auth\Infrastructure\Persistence;

use App\Models\User as EloquentUser;
use Src\BackOffice\Auth\Domain\AuthPassword;
use Src\BackOffice\Auth\Domain\AuthRepository;
use Src\BackOffice\Auth\Domain\AuthUserEmail;
use Src\BackOffice\Auth\Domain\AuthUser;
use Src\BackOffice\Auth\Domain\AuthUserId;
use Src\BackOffice\Auth\Domain\AuthUserUuid;

final class EloquentAuthRepository implements AuthRepository
{

    public function search(AuthUserEmail $userEmail): ?AuthUser
    {
        $eloquentUser = EloquentUser::where('email', $userEmail->value())->first();
        if ($eloquentUser === null) {
            return null;
        }
        return new AuthUser(
            new AuthUserId($eloquentUser->id),
            new AuthUserUuid($eloquentUser->uuid),
            new AuthUserEmail($eloquentUser->email),
            new AuthPassword($eloquentUser->password),
            $eloquentUser->name
        );
    }
}
