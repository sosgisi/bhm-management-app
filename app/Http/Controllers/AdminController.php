<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
    public function products()
    {
        // $products = Product::all();
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::latest()->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'image' => Storage::url($product->image), // Public URL to the image
                    'price' => $product->price,
                    'quantity' => $product->quantity,
                    'unit' => $product->unit,
                ];
            }),
        ]);
    }
    public function productCreate()
    {
        return Inertia::render('Admin/Products/Create');
    }
    public function productStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'string|nullable',
            'price' => 'required|numeric|regex:/^\d{1,8}(\.\d{1,2})?$/',
            'unit' => 'required|string',
            'image' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'quantity' => 'integer'
        ]);


        // Upload the image and store it in the 'public/products' directory
        $imagePath = $request->file('image')->store('products', 'public');

        // Create a new product and save the image path along with other data
        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'unit' => $validated['unit'],
            'image' => $imagePath, // Store the image path
        ]);

        // Product::create($validate);
        return redirect()->route('admin.products')->with('success', 'Produk berhasil ditambahkan!');
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
        return redirect()->route('admin.products')->with('success', 'Produk berhasil diperbarui!');
    }
    public function productDestroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus!');
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
