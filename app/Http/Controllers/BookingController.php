<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{

    public function index(Request $request)
    {
        $owner = $request->query('owner');
        $bookings = Booking::where('owner', $owner)->get();
        return response()->json($bookings);
    }

    // Создать новое бронирование
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'tel' => 'required|string',
            'date' => 'required|array',
            'owner' => 'nullable|string',
        ]);

        $booking = Booking::create($data);
        return response()->json($booking, 201);
    }


    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
            'tel' => 'required|string',
            'date' => 'required|array',
            'owner' => 'nullable|string',
        ]);

        $booking->update($data);
        return response()->json($booking);
    }

    // Удалить бронирование
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();
        return response()->json(null, 204);
    }
    public function cleanExpiredBookings()
    {
        $today = now()->startOfDay();
        $bookings = Booking::all();

        foreach ($bookings as $booking) {
            $dates = array_filter($booking->date, function ($date) use ($today) {
                return new \DateTime($date) >= $today;
            });

            if (empty($dates)) {
                $booking->delete();
            } else {
                $booking->update(['date' => array_values($dates)]);
            }
        }

        return response()->json(['message' => 'Expired bookings cleaned']);
    }
}
