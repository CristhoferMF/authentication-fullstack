<?php

namespace Src\Shared\Infrastructure\Laravel;

use Illuminate\Support\ServiceProvider;
use Src\Shared\Domain\UuidGenerator;

final class BackOfficeSharedServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UuidGenerator::class, LaravelUuidGenerator::class);
    }
}
