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

    public function todayIncome(Request $request)
    {
        $today = Carbon::now()->format('Y-m-d');
        $search = $request->input('search');

        $income = Income::whereDate('date', $today)
            ->with(['products' => function ($query) use ($search) {
                if ($search) {
                    // Apply search filter to related 'products' table
                    $query->where('name', 'like', "%{$search}%");
                }
            }])->first();

        $totalIncome = 0;
        $products = $income->products()->get();
        foreach ($products as $product) {
            $totalIncome += $product->pivot->quantity * $product->price;
        }
        $income->income = $totalIncome;
        $income->save();

        return Inertia::render('Admin/TodayIncome', [
            'income' => $income
        ]);
    }

    public function detailedIncome(Request $request, $incomeId)
    {
        $search = $request->input('search');
        $income = Income::where('id', $incomeId)
            ->with(['products' => function ($query) use ($search) {
                if ($search) {
                    $query->where('name', 'like', "%{$search}%");
                }
            }])->first();
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
            } else {
                $product = Product::find($productId)->first();
                $income->products()->attach($productId, ['quantity' => $quantity]);
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

        return redirect()->back();
    }

    public function updateTodayIncomeProduct(Request $request, $productId)
    {
        $quantity = $request->input('quantity', 1);
        $today = Carbon::now()->format('Y-m-d');
        $income = Income::where('date', $today)->first();
        $income->products()->updateExistingPivot($productId, [
            'quantity' => $quantity
        ]);
        return redirect()->back();
    }

    public function deleteTodayIncomeProduct($productId)
    {
        $today = Carbon::now()->format('Y-m-d');
        $income = Income::where('date', $today)->first();
        $income->products()->detach($productId);
        return redirect()->back();
    }
}
