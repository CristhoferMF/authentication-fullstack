<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Auth\JwtAuthTokenCreator;
use App\Classes\Auth\TokenResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ApiResponse;
use App\Utils\HttpResponseCode;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    private JwtAuthTokenCreator $tokenCreator;
    private User $user;

    //
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $this->user = $this->createUser($request->email, $request->password);
        $this->tokenCreator = $this->instanceTokenCreator();
        return response()->json(
            ApiResponse::success(
                'User created successfully',
                $this->responseData(),
                HttpResponseCode::HTTP_CREATED
            )->toArray()
        );
    }

    private function createUser($email, $password): User
    {
        $user =  User::create([
            'name' => $email,
            'email' => $email,
            'password' => bcrypt($password),
        ]);
        return $user;
    }

    private function instanceTokenCreator(): JwtAuthTokenCreator
    {
        return app(JwtAuthTokenCreator::class, [
            'user' => $this->user,
        ]);
    }

    private function responseData(): array
    {
        $formatter = new TokenResponseFormatter(
            $this->tokenCreator,
            $this->user
        );
        return $formatter->toArray();
    }
}
