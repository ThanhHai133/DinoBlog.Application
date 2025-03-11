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
            'role_id'=>'required|int|in:1,2',
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
            'role_id' => $request->role_id,
        ]);
        return response()->json(['token' => $users->createToken('auth_token')->plainTextToken, 'message' => 'register successfully!'], 201);
        
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'email'=>'required|string|email|max:255',
                'password'=>'required|string|min:8',
            ]
        );
        
        //if the validator fails, return errer
        if($validator->fails())
        {
            return response()->json(['error' => $validator->error()], 422);
        }

        //Find the user
        $users = User::where('email', $request->email)->first();

        //if user don't exits, return error
        if(!$users)
        {
            return response()->json(['message'=>'user does not exits'], 401);
        }

        //If the fails password, return error
        if(!Hash::check($request->password, $users->password))
        {
            return response()->json(['message' => 'Incorrec password'], 401);
        };

        return response()->json(['token'=> $users->createToken('auth_token')->plainTextToken, 'message'=>'Login successfully!'], 201);

    }

    public function logout(Request $request)
    {
        $request->User()->currentAccessToken()->delete();

        return response()->json([
            'message'=>'Logout Successfull.!'
        ], 200);
    }
}
