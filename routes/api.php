<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;

Route::apiResource('bookings', BookingController::class);
Route::post('bookings/clean', [BookingController::class, 'cleanExpiredBookings']);
