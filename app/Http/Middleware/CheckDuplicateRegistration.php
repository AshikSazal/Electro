<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            $validator = Validator::make($req->all(), [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                $error = implode(' ', $validator->errors()->all());
                throw new Exception($error);
            }
        } catch (Exception $exp) {
            return response(["error" => $exp->getMessage()]);
        }

        return $next($req);
    }
}
