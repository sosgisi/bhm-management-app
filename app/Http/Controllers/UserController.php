<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('User/Dashboard');
    }
    public function products()
    {
        return Inertia::render('User/Products');
    }
    public function cart()
    {
        return Inertia::render('User/Cart');
    }
    public function orders()
    {
        return Inertia::render('User/Orders');
    }
    public function settings()
    {
        return Inertia::render('User/Settings');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
