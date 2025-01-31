<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// use function Pest\Laravel\json;

class ProductsController extends Controller
{
    public function products()
    {
        $path = 'Guest/Products';
        if (Auth::check()) {
            if (Auth::user()->role === 'Admin') {
                $path = 'Admin/Products/Index';
            } else if (Auth::user()->role === 'User') {
                $path = 'User/Products';
            }
        }
        return Inertia::render($path, [
            'products' => Product::latest()->get()
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
            'quantity' => 'integer',
            'category' => 'nullable|string'
        ]);


        // Upload the image and store it in the 'public/products' directory
        $imagePath = $request->file('image')->store('product-images');

        // Create a new product and save the image path along with other data
        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'unit' => $validated['unit'],
            'image' => $imagePath, // Store the image path
            'quantity' => $validated['quantity'],
            'category' => $validated['category'],
        ]);

        // Product::create($validate);
        return redirect()->route('admin.products')->with('success', 'Produk berhasil ditambahkan!');
    }
    public function productEdit(Product $product)
    {
        $newProduct = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'image' => Storage::url($product->image),
            'price' => $product->price,
            'unit' => $product->unit,
            'quantity' => $product->quantity,
            'category' => $product->category,
        ];
        return Inertia::render('Admin/Products/Edit', ['product' => $newProduct]);
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

        // Check if a new image is uploaded
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            // Store the new image
            $validate['image'] = $request->file('image')->store('product-images');
        }

        // Update product with validated data
        $product->update($validate);

        return redirect()->route('admin.products')->with('success', 'Produk berhasil diperbarui!');
    }
    public function productDestroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus!');
    }
}
