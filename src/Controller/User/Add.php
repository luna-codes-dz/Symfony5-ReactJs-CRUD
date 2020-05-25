<?php

declare(strict_types=1);

namespace App\Controller\User;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Services\UserManage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;


class Add
{
    private $templating;

    private $builder;

    private $router;

    private $userRepository;

    private $userManager;

    public function __construct(
        Environment $templating,
        FormFactoryInterface $builder,
        RouterInterface $router,
        UserRepository $userRepository,
        UserManage $userManage
    )
    {
        $this->templating = $templating;
        $this->builder = $builder;
        $this->router = $router;
        $this->userRepository = $userRepository;
        $this->userManager = $userManage;
    }

    /**
     * @Route("/api/add", name="add-user", methods={"POST"})
     */
    public function __invoke(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = new User();

        $result = $this->userManager->checkAndPersistUser($user, $request);

        return new JsonResponse($result);
    }
}
