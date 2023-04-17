<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;


class CheckLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $req, Closure $next):Response
    {
        try {
            $req->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);
            $email = $req->input('email');
            $dataExists = User::where('email', $email)->first();
            if (!$dataExists) {
                throw new Exception("User Not found");
            }
        } catch (Exception $exp) {
            return response(["error" => $exp->getMessage()]);
        }
        return $next($req);
    }
}