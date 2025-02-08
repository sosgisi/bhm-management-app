<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/guest/dashboard');

// Guest routes group
Route::middleware('guest')->group(function () {
    Route::get('/guest/dashboard', [GuestController::class, 'dashboard'])->name('guest.dashboard');
    Route::get('/guest/products', [ProductsController::class, 'products'])->name('guest.products');
    Route::get('/guest/products/{product}', [GuestController::class, 'detailedProduct'])->name('guest.products.detail');

    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
});

Route::middleware(['auth', 'isAdmin'])->group(function () {
    // Admin Controller
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/account', [AdminController::class, 'account'])->name('admin.account');
    Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::get('/admin/orders/{order}', [AdminController::class, 'detailedOrder'])->name('admin.orders.detail');
    Route::delete('/admin/orders/{order}', [AdminController::class, 'deleteOrder'])->name('admin.orders.delete');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

    // Products Controller
    Route::get('/admin/products', [ProductsController::class, 'products'])->name('admin.products');
    Route::get('/admin/products/{product}', [AdminController::class, 'detailedProduct'])->name('admin.products.detail');
    Route::get('/admin/product/create', [ProductsController::class, 'productCreate'])->name('admin.product.create');
    Route::get('/admin/products/{product}/edit', [ProductsController::class, 'productEdit'])->name('admin.product.edit');
    Route::post('/admin/products', [ProductsController::class, 'productStore'])->name('admin.product.store');
    Route::put('/admin/products/{product}', [ProductsController::class, 'productUpdate'])->name('admin.product.update');
    Route::delete('/admin/products/{product}', [ProductsController::class, 'productDestroy'])->name('admin.product.destroy');

    // Income Controller
    Route::get('/admin/incomes', [IncomeController::class, 'incomes'])->name('admin.incomes');
    Route::get('/admin/incomes/today', [IncomeController::class, 'todayIncome'])->name('admin.incomes.today');
    Route::get('/admin/incomes/{income}', [IncomeController::class, 'detailedIncome'])->name('admin.incomes.detail');
    Route::post('/admin/incomes/products/{product}', [IncomeController::class, 'addTodayIncomeProduct'])->name('admin.incomes.add.products');
    Route::put('/admin/incomes/products/{product}', [IncomeController::class, 'updateTodayIncomeProduct'])->name('admin.incomes.update.products');
    Route::delete('/admin/incomes/products/{product}', [IncomeController::class, 'deleteTodayIncomeProduct'])->name('admin.incomes.delete.products');
});

Route::middleware(['auth', 'isUser'])->group(function () {
    // User Controller
    Route::get('/user/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/user/products', [ProductsController::class, 'products'])->name('user.products');
    Route::get('/user/products/{product}', [UserController::class, 'detailedProduct'])->name('user.products.detail');
    Route::get('/user/cart', [UserController::class, 'cart'])->name('user.cart');
    Route::get('/user/orders', [UserController::class, 'orders'])->name('user.orders');
    Route::get('/user/orders/{order}', [Usercontroller::class, 'detailedOrder'])->name('user.orders.detail');
    Route::post('/user/logout', [UserController::class, 'logout'])->name('user.logout');

    // Cart CRUD
    Route::post('/user/products/{product}', [UserController::class, 'addProduct'])->name('user.product.add');
    Route::put('/user/products/{product}', [UserController::class, 'updateProduct'])->name('user.product.update');
    Route::delete('/user/products/{product}', [UserController::class, 'destroyProduct'])->name('user.product.destroy');

    // Order CRUD
    Route::post('/user/orders', [UserController::class, 'createOrder'])->name('user.order.create');
    Route::delete('/user/orders/{order}', [UserController::class, 'destroyOrder'])->name('user.order.destroy');
});
