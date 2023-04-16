<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $req, $role)
    {
        $role = (int) $role;
        try {
            $user = User::create([
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'password' => Hash::make($req->input('password')),
                'role' => $role,
            ]);
            $token = Str::random(30);
            $user->api_token = $token;
            $user->save();
            $token = $token . "|@|" . $role;
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
                $token = Str::random(30);
                $user->api_token = $token;
                $user->save();
                $token = $token . "|@|" . $user->role;
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
    public function logout(Request $request)
    {
        $headerValue = $request->bearerToken();
        $role = (int)$headerValue[Str::length($headerValue)-1];
        $token = str_replace(['Bearer ',"|@|$role"], '', $headerValue);
        $user  = User::where('api_token',$token)->first();
        $user->api_token = null;
        $user->save();
        return response(["message"=>"Logged out"]);
    }
}
