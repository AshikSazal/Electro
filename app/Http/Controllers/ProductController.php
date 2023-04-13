<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function store(Request $req){
        try{
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
            $path = $imageFile->storeAs('public/images', $imageName);
            $product = Product::create([
                'name'=> $req->input('name'),
                'brand'=> $req->input('brand'),
                'category'=> $req->input('category'),
                'price'=> $req->input('price'),
                'quantity'=> $req->input('quantity'),
                'description'=> $req->input('description'),
                'image_path'=> $path
            ]);
            return response()->json(['upload' => "Image upload done"], 200);
        }catch(Exception $exp){
            return response(['error'=>$exp->getMessage()]);
        }
    }

    public function fetch(){
        $product = Product::all();
        return response(["product"=>$product]);
    }
}
