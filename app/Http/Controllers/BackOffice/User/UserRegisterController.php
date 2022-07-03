<?php

namespace App\Http\Controllers\BackOffice\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Src\BackOffice\User\Application\UserRegistrator;
use Src\BackOffice\User\Domain\UserEmail;
use Src\BackOffice\User\Domain\UserName;
use Src\BackOffice\User\Domain\UserPassword;
use Src\Shared\Application\ApiResponse;

class UserRegisterController extends Controller
{
    public function __construct(
        protected UserRegistrator $registrator,
    ) {
    }

    //
    public function __invoke(Request $request)
    {
        $request->validate([
            'email'     => 'required|string|email|max:255',
            'password'  => 'required|string|min:8|max:50',
        ]);

        $email    = $request->input('email');
        $password = $request->input('password');

        $this->registrator->__invoke(
            new UserName($email),
            new UserEmail($email),
            new UserPassword($password),
        );

        return response()->json(
            ApiResponse::success('User created successfully')->toArray()
        );
    }
}
