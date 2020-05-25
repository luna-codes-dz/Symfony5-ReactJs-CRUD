<?php

declare(strict_types=1);

namespace App\Controller\User;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;


class Delete
{
    /**
     * @var Environment
     */
    private $templating;

    /**
     * @var FormBuilderInterface
     */
    private $builder;

    /**
     * @var RouterInterface
     */
    protected $router;
    private $userRepository;

    public function __construct(
        Environment $templating,
        FormFactoryInterface $builder,
        RouterInterface $router,
        UserRepository $userRepository
    )
    {
        $this->templating = $templating;
        $this->builder = $builder;
        $this->router = $router;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/api/delete/{id}", name="delete-user", methods={"DELETE"})
     */
    public function __invoke(Request $request, EntityManagerInterface $em, User $user): JsonResponse
    {
        try {
            $em->remove($user);
            $em->flush();

            $message = [
                'message' => 'Delete user OK'
            ];
        } catch (\Exception $exception) {
            $message = [
                'message' => [
                    'text' => 'Could not reach database when attempting to delete a To-Do.',
                    'level' => 'error'
                ]
            ];
        }

        return new JsonResponse($message);
    }
}
