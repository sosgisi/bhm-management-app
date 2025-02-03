<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function incomes()
    {
        $incomes = Income::with('products')->get();
        return Inertia::render('Admin/Income', [
            'incomes' => $incomes
        ]);
    }

    public function todayIncome()
    {
        $today = Carbon::now()->format('Y-m-d');
        $income = Income::where('date', $today)->with('products')->first();
        return Inertia::render('Admin/TodayIncome', [
            'income' => $income
        ]);
    }

    public function detailedIncome($incomeId)
    {
        $income = Income::where('id', $incomeId)->with('products')->first();
        return Inertia::render('Admin/DetailedIncome', [
            'income' => $income
        ]);
    }

    public function addTodayIncomeProduct(Request $request, $productId)
    {
        $today = Carbon::now()->format('Y-m-d');
        $quantity = $request->input('quantity', 1);
        $income = Income::where('date', $today)->first();
        if ($income) {
            $existingProduct = $income->products()->where('product_id', $productId)->first();
            if ($existingProduct) {
                $newQuantity = $existingProduct->pivot->quantity + $quantity;
                $income->products()->updateExistingPivot($productId, [
                    'quantity' => $newQuantity
                ]);
                $income->income = $newQuantity * $existingProduct->price;
                $income->save();
            } else {
                $product = Product::find($productId)->first();
                $income->products()->attach($productId, ['quantity' => $quantity]);
                $income->income += $quantity * $product->price;
                $income->save();
            }
        } else {
            $totalIncome = 0;
            $product = Product::find($productId);
            if ($product) {
                $totalIncome += $quantity * $product->price;
            }
            $income = Income::create([
                'date' => $today,
                'income' => $totalIncome
            ]);
            $income->products()->attach($productId, ['quantity' => $quantity]);
        }

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function updateTodayIncomeProduct(Request $request, $productId)
    {
        $quantity = $request->input('quantity', 1);
        $today = Carbon::now()->format('Y-m-d');
        $income = Income::where('date', $today)->first();
        $income->products()->updateExistingPivot($productId, [
            'quantity' => $quantity
        ]);
        $products = $income->products()->get();
        $newTotal = 0;
        foreach ($products as $product) {
            $newTotal += $product->pivot->quantity * $product->price;
        }
        $income->income = $newTotal;
        $income->save();
        return redirect()->back();
    }

    public function deleteTodayIncomeProduct($productId)
    {
        $today = Carbon::now()->format('Y-m-d');
        $income = Income::where('date', $today)->first();
        $existingProduct = $income->products()->where('product_id', $productId)->first();
        $currentTotal = $existingProduct->pivot->quantity * $existingProduct->price;
        $income->products()->detach($productId);
        $income->income -= $currentTotal;
        $income->save();
        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
    }
}
