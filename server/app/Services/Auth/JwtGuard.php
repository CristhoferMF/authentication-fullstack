<?php

namespace App\Services\Auth;

use App\Services\JwtConfig;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

final class JwtGuard implements Guard
{
    use GuardHelpers;
    protected Request $request;
    protected JwtConfig $jwtConfig;

    public function __construct(
        UserProvider $provider,
        Request $request,
        JwtConfig $jwtConfig
    ) {
        $this->provider = $provider;
        $this->request = $request;
        $this->jwtConfig = $jwtConfig;
    }

    public function user(): ?object
    {
        if (!is_null($this->user)) {
            return $this->user;
        }
        if (!$this->check()) {
            return null;
        }
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return bool
     */
    public function check(): bool
    {
        $token = $this->request->bearerToken();
        $secret = $this->jwtConfig->secret();
        if (is_null($token)) {
            return false;
        }
        try {
            $payload = JWT::decode($token, new Key($secret, $this->jwtConfig->algorithm()));
            $this->user = $this->provider->retrieveById($payload->sub);
            return true;
        } catch (\Throwable $th) {
            return false;
            //throw new ApiErrorException('Invalid or Expired Bearer token.', Response::HTTP_FORBIDDEN, $th);
        }
    }


    public function validate(array $credentials = []): bool
    {
        return true;
    }
}
