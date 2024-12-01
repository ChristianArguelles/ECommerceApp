namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        // Ensure the user is logged in and is an admin
        if (Auth::check()) {
            // Check if the logged-in user has an 'admin' role
            if (Auth::user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized: Admin access only'], 403);
            }
        } else {
            // If the user is not authenticated, return unauthorized
            return response()->json(['message' => 'Unauthorized: Please log in'], 401);
        }

        return $next($request);
    }
}
