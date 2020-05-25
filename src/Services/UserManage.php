<?php

declare(strict_types=1);

namespace App\Services;

use App\Entity\User;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

class UserManage
{
    private $factory;

    private $em;

    public function __construct(FormFactoryInterface $factory, EntityManagerInterface $em)
    {
        $this->factory = $factory;
        $this->em = $em;
    }

    public function checkAndPersistUser(User $user, Request $request): array
    {
        $content = json_decode($request->getContent());

        $form = $this
            ->factory
            ->createBuilder(UserType::class)
            ->getForm();

        $form->submit((array) $content, false);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $result = $this->persistUser($user, $content);
        } else {
            $errors = (string) $form->getErrors(true, false);

            $result = [
                'message' => $errors
            ];
        }

        return $result;
    }

    private function persistUser(User $user, $content): array
    {
        try {
            $user->setFirstname($content->firstname);
            $user->setLastname($content->lastname);
            $user->setEmail($content->email);
            $user->setAvatar($content->avatar);
            $user->setPassword('random-password');

            $this->em->persist($user);
            $this->em->flush();

            $result = [
                'message' => [
                    'text' => 'Update user OK',
                    'user' => $user->jsonSerialize(),
                ]
            ];
        } catch (\Exception $exception) {
            $result = [
                'message' => [
                    'text' => 'Could not reach database when attempting to update the user ' . $user->getId(),
                    'level' => 'error'
                ]
            ];
        }

        return $result;
    }
}