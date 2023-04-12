<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use App\Models\User;

class CheckDuplicateRegistration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $req, Closure $next)
    {
        try {
            $req->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);                
            $email = $req->input('email');
            $dataExists = User::where('email', $email)->first();
            if ($dataExists) {
                throw new Exception("User already exist");
            }
        } catch (Exception $exp) {
            return response(["error" => $exp->getMessage()]);
        }

        return $next($req);
    }
}
