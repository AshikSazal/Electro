<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function storeCartPrduct(Request $req)
    {
        $newProducts = ['prod_id' => $req->input('id'), 'price' => $req->input('price'), "quantity" => 1];
        $userId = $req->attributes->get('user_id');
        $user = User::findOrfail($userId);
        // Any cart item exist for a user
        if (!$user->cartItem()->exists()) {
            $cart = Cart::create([
                "products" => json_encode([$newProducts]),
            ]);
            $user->cartItem()->save($cart);
        } else {
            // cart item already exist and trying to manipulate
            $flag = 0;
            $products = json_decode($user->cartItem->products);
            foreach ($products as $prod) {
                if ($prod->prod_id === $req->input('id')) {
                    $prod->quantity = $prod->quantity + 1;
                    $prod->price = $prod->quantity * $req->input('price');
                    $flag = 1;
                    break;
                }
            }
            if ($flag === 0) {
                $products[] = $newProducts;
            }
            $user->cartItem->products = json_encode($products);
            $user->cartItem->save();

        }
        return ["message" => "done"];
    }
    public function fetchCartPrduct()
    {
        try {
            $userId = request()->attributes->get('user_id');
            $user = User::findOrfail($userId);
            if ($user->cartItem()->exists()) {
                $cart = json_decode($user->cartItem->products);
                return ["cart"=>$cart];
            }
            throw new Exception("You don't have any product in the cart");
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
}
