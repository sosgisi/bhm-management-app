<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/guest/dashboard');

// Guest routes group
Route::middleware('guest')->group(function () {
    Route::get('/guest/dashboard', [AuthController::class, 'guestDashboard'])->name('guest.dashboard');
    Route::get('/guest/products', [AuthController::class, 'guestProducts'])->name('guest.products');
    Route::get('/guest/cart', [AuthController::class, 'guestCart'])->name('guest.cart');

    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');

    Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('password.request');
    Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');
});

Route::middleware(['auth', 'isAdmin'])->group(function () {
    // Show pages
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::get('/admin/income', [AdminController::class, 'income'])->name('admin.income');
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products');
    // CRUD products
    Route::get('/admin/products/create', [AdminController::class, 'productCreate'])->name('admin.product.create');
    Route::post('/admin/products', [AdminController::class, 'productStore'])->name('admin.product.store');
    Route::get('/admin/products/{product}/edit', [AdminController::class, 'productEdit'])->name('admin.product.edit');
    Route::put('/admin/products/{product}', [AdminController::class, 'productUpdate'])->name('admin.product.update');
    Route::delete('/admin/products/{product}', [AdminController::class, 'productDestroy'])->name('admin.product.destroy');

    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
});
