<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class CheckAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $headerValue = $request->header('Authorization');
            if(!$headerValue){
                throw new Exception('Unathenticated');
            }
            $parts = explode("|@|", explode("Bearer ", $headerValue)[1]);
            $token = $parts[0];  

            // $userProvider = Auth::guard('api')->getProvider();
            // In config auth.php file there should be 'users' providers
            $userProvider = app('auth')->createUserProvider('users');
            $user = $userProvider->retrieveByCredentials(['api_token' => $token]);

            if (!$user) {
                throw new Exception('User not found.');
            }
            Auth::guard('api')->setUser($user);
        } catch (Exception $exp) {
            return response([
                "error" => $exp->getMessage(),
            ]);
        }
        return $next($request);
    }
}
