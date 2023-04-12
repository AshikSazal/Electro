<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Exception;

class RegisterController extends Controller
{
    public function register(Request $req, $modelName)
    {
        $model = "App\\Models\\" . ucfirst($modelName);
        if(!$req->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:'.mb_strtolower($modelName) . 's|max:255',
            'password' => 'required|string|min:6',
        ])){
            return response()->json(['error'=>$req->message], 400);
        }
        try {
            $user = $model::create([
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'password' => Hash::make($req->input('password')),
            ]);
            $token = $user->createToken('user_token')->plainTextToken;
            if($modelName === 'admin'){
                $token = $token."|@|1";
            } else if($modelName === 'customer'){
                $token = $token."|@|3";
            }
            return response()->json(['token' => $token], 200);
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
}
