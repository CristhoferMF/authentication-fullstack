<?php

namespace App\Utils;

class ApiErrorResponseFormatter
{
    public function __construct(
        private $message = "",
        private $code = 0,
        private $trace = [],
        private $isDebug = true
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
        }
        return $data;
    }

    public function code(): int
    {
        return $this->code;
    }
}
