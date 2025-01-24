<?php

namespace App\Http\Controllers;

use App\Models\Product;
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

    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidate the session to prevent reuse
        $request->session()->invalidate();
        // Regenerate the CSRF token to prevent CSRF attacks
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    // Product controller
    public function products()
    {
        $products = Product::all();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }
    public function productCreate()
    {
        return Inertia::render('Admin/Products/Create');
    }
    public function productStore(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'description' => 'string',
            'price' => 'required|decimal:min:0.01|max:99999999.99',
            'image' => 'string',
            'quantity' => 'integer'
        ]);

        Product::create($validate);
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan!');
    }
    public function productEdit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', ['product' => $product]);
    }
    public function productUpdate(Request $request, Product $product)
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'description' => 'string',
            'price' => 'required|decimal:min:0.01|max:99999999.99',
            'image' => 'string',
            'quantity' => 'integer'
        ]);

        $product->update($validate);
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui!');
    }
    public function productDestroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus!');
    }
}
