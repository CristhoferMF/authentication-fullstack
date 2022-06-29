<?php

namespace App\Http\Controllers\BackOffice\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginWithEmailAndPasswordRequest;
use App\Utils\HttpResponseCode;
use Src\BackOffice\Auth\Infrastructure\Http\AuthPostController;
use Src\Shared\Application\ApiResponse;

class UserAuthenticationController extends Controller
{
    public function __construct(
        protected AuthPostController $authPostController,
    ) {
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LoginWithEmailAndPasswordRequest $request)
    {
        $authResponse = $this->authPostController->__invoke(
            $request->input('email'),
            $request->input('password')
        );

        return response()->json(
            ApiResponse::success('User logged in successfully', $authResponse->toArray())->toArray()
        );
    }
}
