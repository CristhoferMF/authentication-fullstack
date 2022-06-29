<?php

namespace Src\Shared\Domain;

interface UuidGenerator
{
    public function generate(): string;
    public static function random(): string;
    public static function isValid(string $value): bool;
}
