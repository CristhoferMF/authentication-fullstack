<?php

namespace Src\Shared\Application;

final class ApiResponse
{
    public function __construct(
        private string $message,
        private int $statusCode,
        private ?array $data = null
    ) {
    }

    private function formatData(array $data): array|object
    {
        $keys = array_keys($data);
        $isAssoc = array_keys($keys) !== $keys;

        if (count($data) === 0) {
            return (object) [];
        }
        if ($isAssoc) {
            return (object) $data;
        }
        return $data;
    }

    public function toArray(): array
    {
        return [
            'message' => $this->message,
            'code' => $this->statusCode,
            'data' => isset($this->data) ? $this->formatData($this->data) : null,
        ];
    }

    public static function success(
        string $message,
        array $data = null,
        int $statusCode = 200
    ): self {
        return new self($message, $statusCode, $data);
    }
}
