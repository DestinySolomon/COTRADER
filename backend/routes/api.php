<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| Co-Trader API Routes
|--------------------------------------------------------------------------
|
| Public routes (no token required): register, login
| Protected routes (token required): everything else
|
| All routes here are automatically prefixed with /api
| by Laravel's routing configuration in bootstrap/app.php
|
*/

/* ============================================================
   Public auth routes — no token required
   ============================================================ */
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

/* ============================================================
   Protected routes — requires a valid Sanctum token
   The 'auth:sanctum' middleware checks the Authorization header
   for a Bearer token and rejects requests without one (401).
   ============================================================ */
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user',    [AuthController::class, 'user']);
    });

    // Placeholder routes — we will fill these in as we build each feature
    // Accounts
    Route::prefix('accounts')->group(function () {
        // GET    /api/accounts        — list connected accounts
        // POST   /api/accounts        — connect new account
        // GET    /api/accounts/{id}   — single account
        // PUT    /api/accounts/{id}   — update account
        // DELETE /api/accounts/{id}   — disconnect account
    });

    // Rules
    Route::prefix('rules')->group(function () {
        // Coming in Phase 2
    });

    // Dashboard
    Route::prefix('dashboard')->group(function () {
        // Coming in Phase 1 — after accounts are connected
    });
});