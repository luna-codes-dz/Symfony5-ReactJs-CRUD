<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;

final class Dashboard
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
     * @Route("/users/{reactRouting}", name="home", defaults={"reactRouting": "\d+"})
     */
    public function __invoke(): Response
    {
        return new Response(
            $this->templating->render('dashboard/index.html.twig')
        );
    }
}

