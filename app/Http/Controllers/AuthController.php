<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $req, $role)
    {
        $role = (int)$role;
        try {
            $user = User::create([
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'password' => Hash::make($req->input('password')),
                'role'=>$role
            ]);
            $token = $user->createToken('user_token')->plainTextToken;
            $token = $token."|@|".$role;
            return response()->json(['token' => $token], 200);
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
    public function login(Request $req)
    {
        try {
            $user = User::where('email', '=', $req->input('email'))->firstOrFail();
            if (Hash::check($req->input('password'), $user->password)) {
                $token = $user->createToken('user_token')->plainTextToken;
                $token = $token."|@|".$user->role;
                return response()->json(['token' => $token], 200);
            }
            throw new Exception("Password is not correct");

        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
    public function user()
    {
        return Auth::user();
    }
    public function logout(Request $req)
    {
        try {
            $user = $req->user();
            $user->tokens()->delete();
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
}
