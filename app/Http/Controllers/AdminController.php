<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function orders()
    {
        return Inertia::render('Admin/Orders');
    }

    public function income()
    {
        return Inertia::render('Admin/Income');
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }

    // Product controller

    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidate the session to prevent reuse
        $request->session()->invalidate();
        // Regenerate the CSRF token to prevent CSRF attacks
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
