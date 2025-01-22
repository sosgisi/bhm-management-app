<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function guestDashboard()
    {
        return Inertia::render('Layouts/GuestLayout');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login()
    {
        //
    }

    public function showRegisterForm()
    {
        return Inertia::render('Auth/Register');
    }

    public function register()
    {
        //
    }

    public function showForgotPasswordForm()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function sendResetLink()
    {
        //
    }
}
