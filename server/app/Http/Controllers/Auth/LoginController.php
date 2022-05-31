<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Auth\JwtAuthTokenCreator;
use App\Classes\Auth\TokenResponseFormatter;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginWithEmailAndPasswordRequest;
use App\Models\User;
use App\Utils\ApiErrorException;
use App\Utils\ApiResponse;
use App\Utils\HttpResponseCode;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    //
    private JwtAuthTokenCreator $tokenCreator;
    private User $user;

    public function __invoke(LoginWithEmailAndPasswordRequest $request)
    {
        $this->user = User::whereEmail($request->email)->first();
        if (!Hash::check($request->password, $this->user->password)) {
            throw new ApiErrorException('The password is incorrect.', HttpResponseCode::HTTP_UNAUTHORIZED);
        }
        $this->tokenCreator = $this->instanceTokenCreator();
        return response()->json(
            ApiResponse::success(
                'User logged in successfully',
                $this->responseData(),
                HttpResponseCode::HTTP_OK
            )->toArray()
        );
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
