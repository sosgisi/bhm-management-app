<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/guest/dashboard');

// Guest routes group
Route::middleware('guest')->group(function () {
    Route::get('/guest/dashboard', [AuthController::class, 'guestDashboard'])->name('guest.dashboard');
    Route::get('/guest/products', [ProductsController::class, 'products'])->name('guest.products');
    Route::get('/guest/cart', [AuthController::class, 'guestCart'])->name('guest.cart');

    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');

    Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('password.request');
    Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');
});

Route::middleware(['auth', 'isAdmin'])->group(function () {
    // Admin controller
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::get('/admin/income', [AdminController::class, 'income'])->name('admin.income');
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

    // Products Controller
    Route::get('/admin/products', [ProductsController::class, 'products'])->name('admin.products');
    Route::get('/admin/products/create', [ProductsController::class, 'productCreate'])->name('admin.product.create');
    Route::post('/admin/products', [ProductsController::class, 'productStore'])->name('admin.product.store');
    Route::get('/admin/products/{product}/edit', [ProductsController::class, 'productEdit'])->name('admin.product.edit');
    Route::put('/admin/products/{product}', [ProductsController::class, 'productUpdate'])->name('admin.product.update');
    Route::delete('/admin/products/{product}', [ProductsController::class, 'productDestroy'])->name('admin.product.destroy');
});

Route::middleware(['auth', 'isUser'])->group(function () {
    // show pages
    Route::get('/user/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/user/products', [ProductsController::class, 'products'])->name('user.products');
    Route::get('/user/cart', [UserController::class, 'cart'])->name('user.cart');
    Route::get('/user/orders', [UserController::class, 'orders'])->name('user.orders');
    Route::get('/user/orders/{order}', [Usercontroller::class, 'detailedOrder'])->name('user.orders.detail');
    // Route::get('/user/settings', [UserController::class, 'settings'])->name('user.settings');

    Route::post('/user/products/{product}', [UserController::class, 'addProduct'])->name('user.product.add');
    Route::put('/user/products/{product}', [UserController::class, 'updateProduct'])->name('user.product.update');
    Route::delete('/user/products/{product}', [UserController::class, 'destroyProduct'])->name('user.product.destroy');
    Route::post('/user/orders', [UserController::class, 'createOrder'])->name('user.order.create');
    Route::post('/user/logout', [UserController::class, 'logout'])->name('user.logout');
});
