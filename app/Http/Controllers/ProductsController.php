<?php

namespace App\Http\Controllers;

use App\Models\Product;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// use function Pest\Laravel\json;

class ProductsController extends Controller
{
    public function products(Request $request)
    {
        $search = $request->input('search');
        $products = Product::when($search, function ($query, $search) {
            return $query->where('name', 'like', "%{$search}%");
        })->latest()->get();

        $path = 'Guest/Products';
        if (Auth::check()) {
            if (Auth::user()->role === 'Admin') {
                $path = 'Admin/Products/Index';
            } else if (Auth::user()->role === 'User') {
                $path = 'User/Products';
            }
        }
        return Inertia::render($path, [
            'products' => $products
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
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d{1,8}(\.\d{1,2})?$/',
            'unit' => 'required|string',
            'image' => 'nullable|string',
            'quantity' => 'required|integer',
            'category' => 'nullable|string'
        ]);

        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'unit' => $validated['unit'],
            'image' => $validated['image'],
            'quantity' => $validated['quantity'],
            'category' => $validated['category'],
        ]);

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
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d{1,8}(\.\d{1,2})?$/',
            'unit' => 'required|string',
            'image' => 'nullable|string',
            'quantity' => 'required|integer',
            'category' => 'nullable|string',
        ]);

        $product->update($validate);

        return redirect()->route('admin.products')->with('success', 'Produk berhasil diperbarui!');
    }

    public function productDestroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus!');
    }
}
