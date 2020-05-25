<?php

declare(strict_types=1);

namespace App\Factory;

use App\Entity\User;

class UserFactory
{
    public function __invoke(): User
    {
        return new User();
    }
}
