<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $todayIncome = 0;
        $today = Carbon::now()->format('Y-m-d');
        $income = Income::where('date', $today)->first();
        if ($income) {
            $todayIncome += $income->income;
        }

        $incomes = Income::get();
        $totalIncome = 0;
        foreach ($incomes as $income) {
            $totalIncome += $income->income;
        }

        $productEmpty = 0;
        $products = Product::get();
        foreach ($products as $product) {
            if ($product['quantity'] === 0) {
                $productEmpty += 1;
            }
        }

        $orderNeedToBeSent = 0;
        $orders = Order::get();
        foreach ($orders as $order) {
            if ($order['status'] === 'Perlu dikirim') {
                $orderNeedToBeSent += 1;
            }
        }

        $productTotal = Product::count();
        $orderTotal = Order::count();
        return Inertia::render('Admin/Dashboard', [
            'productEmpty' => $productEmpty,
            'orderNeedToBeSent' => $orderNeedToBeSent,
            'productTotal' => $productTotal,
            'orderTotal' => $orderTotal,
            'todayIncome' => $todayIncome,
            'totalIncome' => $totalIncome
        ]);
    }

    public function account()
    {
        return Inertia::render('Admin/Account');
    }

    public function detailedProduct(Product $product)
    {
        return Inertia::render('Admin/Products/Detailed', [
            'product' => $product
        ]);
    }

    public function orders()
    {
        $orders = Order::with(['user', 'products'])->latest()->get();
        return Inertia::render('Admin/Orders', [
            'orders' => $orders
        ]);
    }

    public function detailedOrder($orderId)
    {
        $order = Order::where('id', $orderId)->with(['user', 'products'])->first();
        return Inertia::render('Admin/DetailedOrder', [
            'order' => $order
        ]);
    }

    public function deleteOrder(Order $order)
    {
        $order->delete();
        return redirect()->route('admin.orders')->with('success', 'Order berhasil dihapus.');
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

    public function productSearch(Request $request)
    {
        $query = $request->input('query');
        if ($query) {
            $products = Product::where('name', "%$query%")->get();
        }
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }
}
