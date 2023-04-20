<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function storeCartPrduct(Request $req)
    {
        if((int)$req->input('quantity')===1){
            $newProducts = ['prod_id' => (int) $req->input('id'), 'price' => (float)$req->input('price'), "quantity" => 1];
        }
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
                if ($prod->prod_id === (int) $req->input('id')) {
                    $prod->quantity = $prod->quantity + (int) $req->input('quantity');
                    $prod->price = $prod->quantity * $req->input('price');
                    if ($prod->quantity === 0) {
                        $index = array_search($prod, $products);
                        array_splice($products, $index, 1);
                    }
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
        $cartData = $this->fetchCartPrduct();
        $cartData = $cartData["cartData"];
        return ["cartData" => $cartData];
    }
    public function fetchCartPrduct()
    {
        try {
            $userId = request()->attributes->get('user_id');
            $user = User::findOrfail($userId);
            if ($user->cartItem()->exists()) {
                $carts = json_decode($user->cartItem->products);
                $prodIds = [];
                foreach ($carts as $cart) {
                    $prodIds[] = $cart->prod_id;
                }
                $products = Product::whereIn('id', $prodIds)->get();
                $cartData = [];
                foreach ($carts as $cart) {
                    $product = $products->where('id', $cart->prod_id)->first();
                    $cartData[] = [
                        'cart' => $cart,
                        'product' => $product,
                    ];
                }
                if(count($cartData) === 0){
                    $user->cartItem()->delete();
                }
                return ["cartData" => $cartData];
            }
            throw new Exception("You don't have any product in the cart");
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }
}
