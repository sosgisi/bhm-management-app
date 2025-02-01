<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function dashboard()
    {
        $products = Product::all();
        $productsTotal = $products->count();
        return Inertia::render('Guest/Dashboard', [
            'productsTotal' => $productsTotal
        ]);
    }

    public function detailedProduct(Product $product)
    {
        return Inertia::render('Guest/DetailedProduct', [
            'product' => $product
        ]);
    }
}
