<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Password confirmation validation
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // Assigning default role 'user' during registration (You can modify this if you want to assign roles based on other criteria)
            'role' => 'user', // Assuming the user model has a 'role' field
        ]);

        // Generate API token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response with user data, token, and token type
        return response([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
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
        
        if (!auth()->attempt($credentials)) {
            return response(['message' => 'Invalid login details'], 401);
        }

        // Get authenticated user
        $user = auth()->user();

        // Generate token for the authenticated user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response with welcome message, user data, and access token
        return response([
            'message' => 'Hi ' . $user->name . ', welcome to home!',
            'user' => $user, // You can return additional user data here if needed
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }
}
