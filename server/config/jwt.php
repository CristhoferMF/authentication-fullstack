<?php

return [
    'secret' => env('JWT_SECRET', 'secret'),
    'algorithm' => env('JWT_ALGORITHM', 'HS256'),
    'ttl' => env('JWT_TTL', 60 * 60 * 24 * 30),
];
