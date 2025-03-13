<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       $users = Auth::user();
        //check static user and role user
        // if(!$request->User() || $request->User()->role_id != 1)
        // {
        //     return response()->json(['error'=>'Unauhorized'], 403);
        // }
        if(!$users || $users->role_id != 1)
        {
            return response()->json(['error'=>'Unauthirzed'], 401);
        }
        //if the user is athentication and has the required role, continue with request
        return $next($request);
    }
}
