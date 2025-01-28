<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $products = Product::all();
        $productsTotal = $products->count();

        /** @var \App\Models\User $user */
        $cart = $user->products()->get();
        $cartTotal = $cart->count();

        return Inertia::render('User/Dashboard', [
            'productsTotal' => $productsTotal,
            'cartTotal' => $cartTotal
        ]);
    }
    public function products()
    {
        return Inertia::render('User/Products');
    }
    public function cart()
    {
        $user = Auth::user();

        /** @var \App\Models\User $user */
        $products = $user->products()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('User/Cart', [
            'products' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'unit' => $product->unit,
                    'image' => Storage::url($product->image),
                    'quantity' => $product->quantity,
                    'category' => $product->category,
                    'created_at' => $product->created_at,
                    'updated_at' => $product->updated_at,
                    'pivot' => [
                        'user_id' => $product->pivot->user_id,
                        'product_id' => $product->pivot->product_id,
                        'quantity' => $product->pivot->quantity,
                        'created_at' => $product->pivot->created_at,
                        'updated_at' => $product->pivot->updated_at
                    ]
                ];
            }),
        ]);
    }
    public function orders()
    {
        return Inertia::render('User/Orders');
    }
    public function settings()
    {
        return Inertia::render('User/Settings');
    }

    public function addProduct(Request $request, $productId)
    {
        $user = Auth::user();

        /** @var \App\Models\User $user */
        $quantity = $request->input('quantity', 1);
        $existingProduct = $user->products()->where('product_id', $productId)->first();

        if ($existingProduct) {
            $newQuantity = $existingProduct->pivot->quantity + $quantity;
            $user->products()->updateExistingPivot($productId, [
                'quantity' => $newQuantity
            ]);
        } else {
            $user->products()->attach($productId, ['quantity' => $quantity]);
        }

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan ke keranjang');
    }

    public function updateProduct(Request $request, $productId)
    {
        $user = Auth::user();

        $request->validate([
            'quantity' => 'required|integer'
        ]);

        /** @var \App\Models\User $user */
        $user->products()->updateExistingPivot($productId, [
            'quantity' => $request->quantity
        ]);

        return redirect()->back();
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
