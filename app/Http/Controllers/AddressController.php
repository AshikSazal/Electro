<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function storeUserAddress(Request $req)
    {
        try {
            $user = Auth::guard('api')->user();
            if (!$user) {
                throw new Exception("User not found");
            }
            $req->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string',
                'post' => 'required|string',
                'road' => 'required|string|max:255',
                'village' => 'required|string|max:255',
                'district' => 'required|string|max:255',
            ]);
            /** @var \App\Models\User $user */
            if ($user->userAddress()->exists()) {
                $address = $user->userAddress;
                $address->name = $req->input('name');
                $address->phone = $req->input('phone');
                $address->post = $req->input('post');
                $address->road = $req->input('road');
                $address->village = $req->input('village');
                $address->district = $req->input('district');
                $address->save();
                return ["message" => "Updated done"];
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
        $user = Auth::guard('api')->user();
        if (!$user) {
            throw new Exception("User not found");
        }
        /** @var \App\Models\User $user */
        if (!$user->userAddress()->exists()) {
            return ['message' => "not found"];
        }
        $address = $user->userAddress;
        return ["address" => $address];
    }
}
