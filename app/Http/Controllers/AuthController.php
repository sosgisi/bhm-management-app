<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegisterForm()
    {
        return Inertia::render('Auth/Register');
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
                return redirect()->route('user.dashboard');
            } else {
                return redirect()->route('guest.dashboard');
            }
        }

        return redirect()->back()->with('message', 'Invalid Credentials');
    }

    public function register()
    {
        //
    }

    public function showForgotPasswordForm()
    {
        //
    }

    public function sendResetLink()
    {
        //
    }
}
