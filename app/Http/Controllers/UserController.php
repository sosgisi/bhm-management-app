<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function Pest\Laravel\get;

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

        $order = $user->orders()->get();
        $orderTotal = $order->count();

        return Inertia::render('User/Dashboard', [
            'productsTotal' => $productsTotal,
            'cartTotal' => $cartTotal,
            'orderTotal' => $orderTotal
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
            'products' => $products
        ]);
    }

    public function orders()
    {
        $user = Auth::user();
        /** @var \App\Models\User $user */
        $orders = $user->orders()->with('products')->get();

        return Inertia::render('User/Orders', [
            'orders' => $orders
        ]);
    }

    public function detailedOrder($orderId)
    {
        $user = Auth::user();
        /** @var \App\Models\User $user */
        $order = $user->orders()->with('products')->where('id', $orderId)->first();
        return Inertia::render('User/DetailedOrder', [
            'order' => $order
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
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

    public function destroyProduct($productId)
    {
        $user = Auth::user();
        /** @var \App\Models\User $user */
        $user->products()->detach($productId);
        return redirect()->back()->with('success', 'Product berhasil dihapus');
    }

    public function createOrder(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $order = $user->orders()->create([
            'total' => $request->total,
            'status' => 'Belum bayar.'
        ]);
        foreach ($request->products as $products) {
            $user->products()->detach($products['id']);
            $order->products()->attach($products['id'], [
                'quantity' => $products['quantity']
            ]);
        }

        return redirect()->back()->with('success', 'Order berhasil dibuat');
    }

    public function destroyOrder($orderId)
    {
        $user = Auth::user();
        /** @var \App\Models\User $user */
        $order = $user->orders()->delete($orderId);

        return redirect()->route('user.orders')->with('success', 'Order berhasil dihapus');
    }
}
