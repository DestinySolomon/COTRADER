<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            // UUID primary key — more secure than auto-increment for user IDs
            $table->uuid('id')->primary();

            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // User's timezone — important for AI coaching context and time-based rules
            $table->string('timezone', 100)->default('UTC');

            // Profile avatar (stored in R2/S3 later)
            $table->text('avatar_url')->nullable();

            // Null until the user completes the onboarding flow
            $table->timestamp('onboarding_completed_at')->nullable();

            $table->rememberToken();
            $table->timestamps(); // created_at and updated_at
        });

        // Password reset tokens table (Laravel default — keep it)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Session table (used when SESSION_DRIVER=database, optional for now)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUuid('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};