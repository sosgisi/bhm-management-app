<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        URL::forceScheme('https');
        Inertia::share([
            'auth' => function (Request $request) {
                return [
                    'user' => $request->user()
                        ? [$request->user()->only('id', 'name', 'email', 'role')]
                        : null,
                ];
            },
            'flash' => function (Request $request) {
                return [
                    'success' => $request->session()->get('success'),
                    'message' => $request->session()->get('message'),
                ];
            },
            'errors' => function () {
                return session()->get('errors')
                    ? session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);
    }
}
