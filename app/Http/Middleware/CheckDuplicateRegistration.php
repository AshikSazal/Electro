<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;

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
        $model = ucfirst($req->route('modelType'));
        $modelName = "App\\Models\\$model";
        try {
            if (!class_exists($modelName)) {
                throw new Exception("Invalid Request");
            }
            $req->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);                
            $email = $req->input('email');
            $dataExists = $modelName::where('email', $email)->first();
            if ($dataExists) {
                throw new Exception("User already exists");
            }
        } catch (Exception $exp) {
            return response(["error" => $exp->getMessage()]);
        }

        return $next($req);
    }
}
