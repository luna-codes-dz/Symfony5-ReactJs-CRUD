<?php

declare(strict_types=1);

namespace App\Interfaces;

interface UserInterface
{
    public function getId();
    public function getLastname();
    public function setLastname(string $lastname);
    public function getFirstname();
    public function getEmail();
    public function getUsername();
    public function jsonSerialize();
}
