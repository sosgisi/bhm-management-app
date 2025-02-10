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
            'description' => 'string|nullable',
            'price' => 'required|numeric|regex:/^\d{1,8}(\.\d{1,2})?$/',
            'unit' => 'required|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'quantity' => 'integer',
            'category' => 'nullable|string'
        ]);

        $uploadedFileUrl = null;
        if ($request->image) {
            $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
        }

        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'unit' => $validated['unit'],
            'image' => $uploadedFileUrl,
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
            'description' => 'string|nullable',
            'price' => 'required|numeric|regex:/^\d{1,8}(\.\d{1,2})?$/',
            'unit' => 'required|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'quantity' => 'integer',
            'category' => 'nullable|string',
        ]);

        // If a new image is uploaded
        if ($request->hasFile('image')) {
            // Delete the old image from Cloudinary if it exists
            if ($product->image) {
                // Extract the public ID from the Cloudinary URL
                $publicId = pathinfo($product->image, PATHINFO_FILENAME);
                Cloudinary::destroy($publicId);
            }

            // Upload new image to Cloudinary and get the URL
            $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
            $validated['image'] = $uploadedFileUrl; // Store the new URL
        }

        // if ($product->image !== $request->image) {
        //     Storage::disk('public')->delete($product->image);
        //     $imagePath = $request->file('image')->store('product-images');
        //     $validate['image'] = $imagePath;
        // }

        $product->update($validate);

        return redirect()->route('admin.products')->with('success', 'Produk berhasil diperbarui!');
    }

    public function productDestroy(Product $product)
    {
        if ($product->image) {
            // Extract the public ID from the Cloudinary URL
            $publicId = pathinfo($product->image, PATHINFO_FILENAME);
            Cloudinary::destroy($publicId);
        }

        // if ($product->image) {
        //     Storage::disk('public')->delete($product->image);
        // }
        $product->delete();
        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus!');
    }
}
