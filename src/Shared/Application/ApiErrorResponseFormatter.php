<?php

namespace Src\Shared\Application;

use Throwable;

final class ApiErrorResponseFormatter
{
    public function __construct(
        private $message = "",
        private $code = 0,
        private $trace = [],
        private $isDebug = true,
        private ?Throwable $throwable = null,
    ) {
    }

    public function format(): array
    {
        $data = [
            'message' => $this->message,
            'code' => $this->code,
        ];

        if ($this->isDebug) {
            $data['trace'] = $this->trace;
            $data['exception'] = $this->throwable ? $this->throwable::class : null;
        }
        return $data;
    }

    public function code(): int
    {
        return $this->code;
    }
}
