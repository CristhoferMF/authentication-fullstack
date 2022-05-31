<?php

namespace App\Utils;

final class ApiResponse
{
    public function __construct(private string $message, private int $statusCode, private array|object $data = [])
    {
    }

    public function toArray(): array
    {
        return [
            'data' => count($this->data) > 0 ? $this->data : null,
            'message' => $this->message,
            'statusCode' => $this->statusCode,
        ];
    }

    public static function success(
        string $message,
        array|object $data = [],
        int $statusCode = HttpResponseCode::HTTP_OK
    ): self {
        return new self($message, $statusCode, $data);
    }
}
