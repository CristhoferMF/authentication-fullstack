<?php

namespace Src\Shared\Infrastructure\Laravel;

use Illuminate\Support\Str;
use Src\Shared\Domain\UuidGenerator;

final class LaravelUuidGenerator implements UuidGenerator
{
    public function generate(): string
    {
        return Str::uuid()->toString();
    }

    public static function random(): string
    {
        return (new self())->generate();
    }

    public static function isValid(string $value): bool
    {
        return Str::isUuid($value);
    }
}
