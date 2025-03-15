<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:8',
        ]);

        //if validator fails, return error
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }

        //else validator true, return create users
        $users = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make( $request->password),
            'role_id' => 2,
        ]);
        return response()->json(['token' => $users->createToken('auth_token')->plainTextToken, 'message' => 'register successfully!'], 201);
        
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }

            $users = User::where('email', $request->email)->first();
            if (!$users) {
                return response()->json(['message' => 'User does not exist'], 401);
            }

            if (!Hash::check($request->password, $users->password)) {
                return response()->json(['message' => 'Incorrect password'], 401);
            }

            return response()->json([
                'token' => $users->createToken('auth_token')->plainTextToken,
                'role_id' => $users->role_id,
                'message' => 'Login successful'
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->User()->currentAccessToken()->delete();

        return response()->json([
            'message'=>'Logout Successfull.!'
        ], 200);
    }
}
