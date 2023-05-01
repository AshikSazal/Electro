<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


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
            $validator = Validator::make($req->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                $error = implode(' ', $validator->errors()->all());
                throw new Exception($error);
            }
            $email = $req->input('email');
            $password = $req->input('password');
            if(!Auth::attempt(['email'=>$email, 'password'=>$password])){
                throw new Exception("Invalid Emaill or Password");
            }
        } catch (Exception $exp) {
            return response(["error" => $exp->getMessage()]);
        }
        return $next($req);
    }
}
