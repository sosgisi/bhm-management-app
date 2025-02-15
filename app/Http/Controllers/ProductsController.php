<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function products(Request $request)
    {
        $search = $request->input('search');
        $products = Product::when($search, function ($query, $search) {
            return $query->where('name', 'like', "%{$search}%");
        })->latest()->paginate(20);

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
        $uploadedFileUrl = null;
        $uploadedPublicId = null;
        if ($request->hasFile('image')) {
            $upload = cloudinary()->upload($request->file('image')->getRealPath());
            $uploadedFileUrl = $upload->getSecurePath();
            $uploadedPublicId = $upload->getPublicId();
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|integer',
            'unit' => 'required|string',
            'image' => 'nullable',
            'public_id' => 'nullable',
            'quantity' => 'required|integer',
            'category' => 'nullable|string'
        ]);

        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'unit' => $validated['unit'],
            'image' => $uploadedFileUrl ?? $validated['image'],
            'public_id' => $uploadedPublicId ?? null,
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
        $uploadedFileUrl = null;
        $uploadedPublicId = null;
        if ($request->hasFile('image')) {
            if ($request->prevImage) {
                cloudinary()->destroy($request->prevImage);
            }
            $upload = cloudinary()->upload($request->file('image')->getRealPath());
            $uploadedFileUrl = $upload->getSecurePath();
            $uploadedPublicId = $upload->getPublicId();
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|integer',
            'unit' => 'required|string',
            'image' => 'nullable',
            'public_id' => 'nullable',
            'quantity' => 'required|integer',
            'category' => 'nullable|string'
        ]);

        $product->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'unit' => $validated['unit'],
            'image' => $uploadedFileUrl ?? $validated['image'],
            'public_id' => $uploadedPublicId ?? null,
            'quantity' => $validated['quantity'],
            'category' => $validated['category'],
        ]);

        return redirect()->route('admin.products')->with('success', 'Produk berhasil diperbarui!');
    }

    public function productDestroy(Product $product)
    {
        if ($product->public_id) {
            cloudinary()->destroy($product->public_id);
        }
        $product->delete();
        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus!');
    }
}
