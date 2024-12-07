<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
public function register(Request $request)
{
    Log::info('Register request received: ' . json_encode($request->all()));
    // Validate incoming request
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'confirm_password' => 'required|string|same:password', // Password confirmation validation
        'role' => 'required|string|in:user,admin', // Role validation
    ]);

    if ($validator->fails()) {
        Log::error('Validation failed: ' . json_encode($validator->errors()->all()));
        return response(['errors' => $validator->errors()->all()], 422);
    }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Password is stored without hashing
            'role' => $request->role, // Store the role
        ]);

        // Generate API token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Log token for debugging
        Log::info('Generated token: ' . $token);

        // Return response with user data and token
        return response([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201)->header('Location', '/login');
    }

    /**
     * Login a user and return an access token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Validate login credentials
        $credentials = $request->only('email', 'password');
        
        if (!$this->validateCredentials($credentials)) {
            return response(['message' => 'Invalid login details'], 401);
        }

        // Get authenticated user
        $user = User::where('email', $credentials['email'])->first();

        // Generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response
        return response([
            'message' => 'Hi ' . $user->name . ', welcome back!',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    /**
     * Admin login and return an access token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function adminLogin(Request $request)
    {
        // Validate login credentials
        $credentials = $request->only('email', 'password');
        
        if (!$this->validateCredentials($credentials)) {
            return response(['message' => 'Invalid login details'], 401);
        }

        // Get authenticated user
        $user = User::where('email', $credentials['email'])->first();

        // Check if the user is an admin
        if ($user->role !== 'admin') {
            return response(['message' => 'Unauthorized'], 403);
        }

        // Generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response
        return response([
            'message' => 'Hi ' . $user->name . ', welcome back!',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    /**
     * Validate user credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    private function validateCredentials(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();

        if ($user && $user->password === $credentials['password']) {
            return true;
        }

        return false;
    }
}
