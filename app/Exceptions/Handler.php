<?php

namespace App\Exceptions;

use App\Utils\HttpResponseCode;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Src\Shared\Application\ApiErrorResponseFormatter;
use Src\Shared\Domain\ApiErrorException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
        $this->renderable(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*') && $request->expectsJson()) {
                $apiErrorFormatter = new ApiErrorResponseFormatter(
                    "Route not found",
                    HttpResponseCode::HTTP_NOT_FOUND,
                    $e->getTrace(),
                    config('app.debug')
                );
                return response()->json(
                    $apiErrorFormatter->format(),
                    $apiErrorFormatter->code()
                );
            }
        });

        $this->renderable(function (ApiErrorException $e) {
            //
            $apiErrorFormatter = new ApiErrorResponseFormatter(
                $e->getMessage(),
                $e->getCode(),
                $e->getTrace(),
                config('app.debug'),
                $e
            );
            return response()->json(
                $apiErrorFormatter->format(),
                $apiErrorFormatter->code() ?? HttpResponseCode::HTTP_INTERNAL_SERVER_ERROR
            );
        });
    }
}
