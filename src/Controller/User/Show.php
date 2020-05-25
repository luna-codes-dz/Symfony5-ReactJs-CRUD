<?php

declare(strict_types=1);

namespace App\Controller\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;

final class Show
{
    /**
     * @var Environment
     */
    private $templating;

    public function __construct(Environment $templating)
    {
        $this->templating = $templating;
    }

    /**
     * @Route("/api/user/{id}", name="user")
     */
    public function __invoke(User $user): JsonResponse
    {
        $response = new JsonResponse();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $user = json_encode($user->jsonSerialize());
        $response->setContent($user);

        return $response;
    }
}
