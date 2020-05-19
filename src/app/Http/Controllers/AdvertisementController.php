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
//        return view('welcome', [
//            'data' => $allAds,
//            'current_page' => $allAds->currentPage(),
//            'last_page' => $allAds->lastPage()
//        ]);
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
//        $this->validate($request, [
//            'title' => 'required|max:100',
//            'phone' => 'required|min:10|max:13',
//            'email' => 'required|email',
//            'end_date' => 'required|date_format:Y-m-d|after:today',
//            'description' => 'required',
//            'image' => 'image|mimes:jpeg,png,jpg|max:2048',
//
//        ]);
//        print_r('asfsafafasf');
//        print_r($request->data);
//        print_r($request->file('image'));
//        print_r($request->data->country);
//        print_r($request->country);
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
                'user_id'=>1,
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


    public function update(Request $request, $updateId=null)
    {
        if (auth()->check() and $request->input('user_id') == auth()->user()->id) {
            $this->validate($request, [
                'title' => 'required|max:100',
                'full_number' => 'required|min:10|max:13',
                'email' => 'required|email',
                'end_date' => 'required|date_format:Y-m-d|after:today',
                'description' => 'required',
                'image' => 'image|mimes:jpeg,png,jpg|max:2048'

            ]);

            if ($request->exists('saved_image') and !$request->exists('saved_image')) {
                $imageName = $request->input('saved_image');
            } else {
                $imageName = null;
            }
            if ($request->image) {
                $imageName = time().'.'.$request->image->getClientOriginalExtension();
                $request->image->move(public_path('images'), $imageName);

            }

            $advertisementModel = new Ads();
            if ($request->input('addLocation') == 'False') {
                $latitude = null;
                $longitude = null;

            } else {
                $latitude = $request->input('latitude');
                $longitude = $request->input('longitude');
            }
            if ($updateId) {
                $advertisementModel->where('id', $request->input('ad_id'))->update(
                    [
                        'title' => $request->input('title'),
                        'description' => $request->input('description'),
                        'phone' => $request->input('full_number'),
                        'country' => $request->input('country'),
                        'email' => $request->input('email'),
                        'end_date' => $request->input('end_date'),
                        'image' => $imageName,
                        'latitude' => $latitude,
                        'longitude' => $longitude
                    ]
                );
            }
            return redirect(route('posts.show', $request->input('ad_id')));
        }else{
            return redirect(route('posts.index'));
        }
    }

}
