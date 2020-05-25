<?php

declare(strict_types=1);

namespace App\Controller\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;

final class Index
{
    /**
     * @var Environment
     */
    private $templating;

    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(
        Environment $templating,
        UserRepository $userRepository
    )
    {
        $this->templating = $templating;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/api/users", name="users")
     */
    public function __invoke(): JsonResponse
    {
        $users = $this->userRepository->findAll();

        $response = new JsonResponse();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $jsonUsers = json_encode($this->jsonSerialize($users));
        $response->setContent($jsonUsers);

        return $response;
    }

    private function jsonSerialize($users)
    {
        return \array_map(function (User $user) {
            return $user->jsonSerialize();
        }, $users);
    }
}
