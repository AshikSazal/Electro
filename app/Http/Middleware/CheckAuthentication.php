<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            $role = (int)$headerValue[Str::length($headerValue)-1];
            $token = str_replace(['Bearer ',"|@|$role"], '', $headerValue);
            $user = User::where('api_token', $token)->where('role', $role)->exists();
            if (!$user) {
                throw new Exception("Unauthenticated");
            }
            $user = User::where('api_token', $token)->where('role', $role)->first();
            $request->attributes->set('role', $role);
            $request->attributes->set('user_id', $user->id);
        } catch (Exception $exp) {
            return response([
                "error" => $exp->getMessage(),
            ]);
        }
        return $next($request);
    }
}
