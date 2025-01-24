<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function guestDashboard()
    {
        return Inertia::render('Guest/Dashboard');
    }

    public function guestProducts()
    {
        return Inertia::render('Guest/Products');
    }

    public function guestCart()
    {
        return Inertia::render('Guest/Cart');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'password' => 'required'
        ]);
        if (Auth::attempt($validate)) {
            $user = Auth::user();

            if ($user->role === 'Admin') {
                return redirect()->route('admin.dashboard');
            } else if ($user->role === 'User') {
                // return dd($user);
                return redirect()->route('user.dashboard');
            } else {
                return redirect()->route('guest.dashboard');
            }
        }

        return back()->withErrors(['message' => 'Invalid Credentials']);
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
