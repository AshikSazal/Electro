<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function storeProduct(Request $req)
    {
        try {
            $user = Auth::guard('api')->user();
            $role = $user->role;
            if ($role !== 1) {
                throw new Exception("You are not allowed do that");
            }
            $req->validate([
                'name' => 'required|string|max:255',
                'brand' => 'required|string|max:255',
                'category' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'quantity' => 'required|integer|min:0',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);
            $imageFile = $req->file('image');
            $imageName = date('YmdHis') . '.' . $imageFile->getClientOriginalExtension();
            $imageFile->move('images/', $imageName);
            Product::create([
                'name' => $req->input('name'),
                'brand' => $req->input('brand'),
                'category' => $req->input('category'),
                'price' => $req->input('price'),
                'quantity' => $req->input('quantity'),
                'description' => $req->input('description'),
                'image_name' => $imageName,
            ]);
            return response()->json(['message' => "Image upload done"], 200);
        } catch (Exception $exp) {
            return response(['error' => $exp->getMessage()]);
        }
    }

    public function fetchAdminProduct()
    {
        $product = Product::all();
        return response(["product" => $product]);
    }

    public function fetchUserAllProduct($category)
    {
        // global $product;
        if($category === 'all'){
            $product = Product::all();
        }else{
            $cate = ucfirst($category);
            // return $cate;
            $product = Product::where('category',$cate)->get();
        }
        return response(["product" => $product]);
    }

    public function deleteProduct($id)
    {
        try {
            $product = Product::find($id);
            $image_path = public_path('images/' . $product->image_name);
            $product->delete();
            if (file_exists($image_path)) {
                unlink($image_path);
            }
            return response(["error" => "Delete successfully"]);
        } catch (Exception $exp) {
            return response(['error' => $exp->getMessage()]);
        }
    }
}
