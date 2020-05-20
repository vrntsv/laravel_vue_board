<?php

namespace App\Http\Controllers;
use App\Ads;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AdvertisementController extends Controller
{

    public function index()
    {
        $ad = new Ads();
        $allAds = $ad->getAllAds();
        return $allAds;
    }

    public function create()
    {
        if (auth()->check()){
            return view('createAdvertisement')->withInput(Input::all());
        } else {
            return redirect('/');
        }
    }

    public function edit($id)
    {
        $advertisementModel = new Ads();
        $advertisementData =  $advertisementModel->getAdById($id);
        if (auth()->check() and auth()->user()->id == $advertisementData[0]->user_id) {
            return view('updateAdvertisement', ['advertisementData' => $advertisementData]);
        } else {
            return redirect('/');
        }
    }


    public static function show($id)
    {

        $advertisementModel = new Ads();
        $advertisementData =  $advertisementModel->getAdById($id);
        return $advertisementData;
//        if (count($advertisementData) > 0){
//            return view('advertisementInfo', ['advertisementData' => $advertisementData]);
//        } else {
//            return redirect('/');
//
//        }
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:100',
            'phone' => 'required|min:10|max:13',
            'email' => 'required|email',
            'date_end' => 'required|date_format:Y-m-d',
            'description' => 'required',

        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/storage/images/';
            $uploadFileName = $file->getClientOriginalName();
            $file->move($uploadDir, $uploadFileName);
        }else{
            $uploadFileName = null;
        }

        $advertisementModel = new Ads();
        if (!$request->input('addLocation')) {
            $latitude = null;
            $longitude = null;

        } else {
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');
        }
        $createdAdId = $advertisementModel->insertGetId(
            [
                'user_id'=>$request->input('user_id'),
                'title'=>$request->input('title'),
                'description'=>$request->input('description'),
                'phone'=>$request->input('phone'),
                'country'=>$request->input('country'),
                'email'=>$request->input('email'),
                'end_date'=>$request->input('date_end'),
                'image'=>$uploadFileName,
                'latitude'=>$latitude,
                'longitude'=>$longitude
            ]
        );
        return response()->json([
            'id' => $createdAdId,
        ]);
    }


    public function update(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:100',
            'phone' => 'required|min:10|max:13',
            'email' => 'required|email',
            'date_end' => 'required|date_format:Y-m-d',
            'description' => 'required',

        ]);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/storage/images/';
            $uploadFileName = $file->getClientOriginalName();

            $file->move($uploadDir, $uploadFileName);
        }else{
            $uploadFileName = null;
            if ($request->input('prevImage')){
                $uploadFileName = $request->input('prevImage');
            }
        }

        $advertisementModel = new Ads();
        if ($request->input('addLocation') == "false") {
            $latitude = null;
            $longitude = null;

        } else {
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');
        }
        $advertisementModel->where('id', $request->input('ad_id'))->update(
            [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'phone' => $request->input('phone'),
                'country' => $request->input('country'),
                'email' => $request->input('email'),
                'end_date' => $request->input('date_end'),
                'image' => $uploadFileName,
                'latitude' => $latitude,
                'longitude' => $longitude
            ]
        );

        return response()->json([
            'id' => $request->input('ad_id'),
        ]);

    }

}
