<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function storeUserAddress(Request $req)
    {
        try {
            $userId = (int) $req->attributes->get('user_id');
            $req->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string',
                'post' => 'required|string',
                'road' => 'required|string|max:255',
                'village' => 'required|string|max:255',
                'district' => 'required|string|max:255',
            ]);
            $user = User::findOrfail($userId);
            if(!$user){
                throw new Exception("User not found");
            }
            $address = Address::create([
                "name" => $req->input('name'),
                "phone" => $req->input('phone'),
                "post" => $req->input('post'),
                "road" => $req->input('road'),
                "village" => $req->input('village'),
                "district" => $req->input('district'),
            ]);
            $user->userAddress()->save($address);
            return ["message" => "done"];
        } catch (Exception $exp) {
            return response()->json([
                'error' => $exp->getMessage(),
            ]);
        }
    }

    public function fetchUserAddress()
    {
        $userId = request()->attributes->get('user_id');
        $user = User::findOrfail($userId);
        if(!$user->userAddress()->exists()){
            return ['message' => "not found"];
        }
        $address = $user->userAddress;
        return ["address"=>$address];
    }
}
