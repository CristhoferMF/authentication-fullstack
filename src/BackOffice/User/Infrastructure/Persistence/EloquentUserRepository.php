<?php

namespace Src\BackOffice\User\Infrastructure\Persistence;

use App\Models\User as EloquentUser;
use Src\BackOffice\User\Domain\User;
use Src\BackOffice\User\Domain\UserEmail;
use Src\BackOffice\User\Domain\UserId;
use Src\BackOffice\User\Domain\UserName;
use Src\BackOffice\User\Domain\UserPasswordHashed;
use Src\BackOffice\User\Domain\UserRepository;

final class EloquentUserRepository implements UserRepository
{
    public function find(UserId $id): ?User
    {
        $user = EloquentUser::find($id->value());
        if ($user === null) {
            return null;
        }
        return new User(
            new UserId($user->uuid),
            new UserName($user->name),
            new UserEmail($user->email),
            new UserPasswordHashed($user->password)
        );
    }

    public function save(User $user): void
    {
        $eloquentUser           = new EloquentUser();
        $eloquentUser->uuid     = $user->id()->value();
        $eloquentUser->name     = $user->name()->value();
        $eloquentUser->email    = $user->email()->value();
        $eloquentUser->password = $user->passwordHashed()->value();

        $eloquentUser->save();
    }

    public function emailIsTaken(UserEmail $email): bool
    {
        return EloquentUser::where('email', $email->value())->exists();
    }
}
