<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $req, $modelName)
    {
        $model = "App\\Models\\" . ucfirst($modelName);
        try {
            $user = $model::create([
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'password' => Hash::make($req->input('password')),
            ]);

            $token = $user->createToken('user_token')->plainTextToken;
            if ($modelName === 'admin') {
                $token = $token . "|@|1";
            } else if ($modelName === 'customer') {
                $token = $token . "|@|3";
            }
            return response()->json(['token' => $token], 200);
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
    public function login(Request $req, $modelName)
    {
        $model = "App\\Models\\" . ucfirst($modelName);
        try {
            $user = $model::where('email', '=', $req->input('email'))->firstOrFail();
            if (Hash::check($req->input('password'), $user->password)) {
                $token = $user->createToken('user_token')->plainTextToken;
                if ($modelName === 'admin') {
                    $token = $token . "|@|1";
                } else if ($modelName === 'customer') {
                    $token = $token . "|@|3";
                }
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
