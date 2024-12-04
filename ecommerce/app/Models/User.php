<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Ensure you're using Sanctum if you're using API tokens

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens; // Use HasApiTokens to allow token authentication

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // Include role in the fillable array if it's being mass-assigned
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime', 
        'password' => 'hashed', // Ensure password is treated as a hashed string
        'role' => 'string', // Ensure role is treated as a string
    ];

    /**
     * Automatically hash the password when creating/updating the user.
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if ($user->password) {
                $user->password = bcrypt($user->password); // Automatically hash password
            }
        });

        static::updating(function ($user) {
            if ($user->password) {
                $user->password = bcrypt($user->password); // Hash the password when updating
            }
        });
    }
}
