<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $productTotal = Product::count();
        $orderTotal = Order::count();
        return Inertia::render('Admin/Dashboard', [
            'productTotal' => $productTotal,
            'orderTotal' => $orderTotal
        ]);
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

    public function detailedProduct(Product $product)
    {
        return Inertia::render('Admin/Products/Detailed', [
            'product' => $product
        ]);
    }

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
