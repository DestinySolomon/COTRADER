<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * POST /api/auth/register
     *
     * Request body:
     *   name                  string, required
     *   email                 string, required, unique
     *   password              string, required, min 8 chars
     *   password_confirmation string, required, must match password
     *
     * Returns the new user and a Sanctum API token.
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'min:2', 'max:100'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => [
                'required',
                'confirmed',               // checks password_confirmation field
                Password::min(8)
                    ->mixedCase()          // at least one uppercase + one lowercase
                    ->numbers(),           // at least one number
            ],
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'timezone' => $request->input('timezone', 'UTC'),
        ]);

        // Create a Sanctum personal access token for this user
        // 'auth_token' is just a label — helps identify the token type later
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully.',
            'data'    => [
                'user'  => $this->formatUser($user),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * Log in an existing user.
     *
     * POST /api/auth/login
     *
     * Request body:
     *   email    string, required
     *   password string, required
     *
     * Returns the user and a fresh Sanctum API token.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Attempt to find user by email
        $user = User::where('email', $request->email)->first();

        // Check user exists and password matches
        if (! $user || ! Hash::check($request->password, $user->password)) {
            // Use the same generic message for both cases
            // (never tell an attacker whether the email exists)
            throw ValidationException::withMessages([
                'email' => ['The email or password you entered is incorrect.'],
            ]);
        }

        // Revoke all previous tokens for this user on login
        // This ensures only one active session at a time
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully.',
            'data'    => [
                'user'  => $this->formatUser($user),
                'token' => $token,
            ],
        ]);
    }

    /**
     * Log out the current user.
     *
     * POST /api/auth/logout
     *
     * Deletes the current Sanctum token so it can no longer be used.
     */
    public function logout(Request $request): JsonResponse
    {
        // Delete only the token that was used for this request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Return the currently authenticated user.
     *
     * GET /api/auth/user
     *
     * Used by the frontend on app boot (initAuth in useAuthStore)
     * to confirm the stored token is still valid.
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $this->formatUser($request->user()),
        ]);
    }

    /**
     * Format the user object for API responses.
     *
     * We never return the raw Eloquent model directly —
     * this gives us full control over what the frontend sees.
     * The password is already hidden by the model's $hidden array,
     * but being explicit here is good practice.
     */
    private function formatUser(User $user): array
    {
        return [
            'id'                       => $user->id,
            'name'                     => $user->name,
            'email'                    => $user->email,
            'timezone'                 => $user->timezone,
            'avatar_url'               => $user->avatar_url,
            'onboarding_completed'     => $user->hasCompletedOnboarding(),
            'created_at'               => $user->created_at->toISOString(),
        ];
    }
}