<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Cloudinary\Cloudinary;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary as FacadesCloudinary;
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

        if ($request->hasFile('image')) {
            $uploadedFileUrl = FacadesCloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
        } else {
            $uploadedFileUrl = FacadesCloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
        }

        // // Upload the image and store it in the 'public/products' directory
        // $imagePath = $request->file('image')->store('product-images');

        // Create a new product and save the image path along with other data
        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'unit' => $validated['unit'],
            'image' => $uploadedFileUrl, // Store the image path
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
                FacadesCloudinary::destroy($publicId);
            }

            // Upload new image to Cloudinary and get the URL
            $uploadedFileUrl = FacadesCloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
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
            FacadesCloudinary::destroy($publicId);
        }

        // if ($product->image) {
        //     Storage::disk('public')->delete($product->image);
        // }
        $product->delete();
        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus!');
    }
}
