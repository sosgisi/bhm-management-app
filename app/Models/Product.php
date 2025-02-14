<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'unit',
        'image',
        'public_id',
        'quantity',
        'category',
    ];

    // protected $appends = ['image_url'];

    // public function getImageUrlAttribute()
    // {
    //     return Storage::url($this->image);
    // }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_product')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function order()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }

    public function income()
    {
        return $this->belongsToMany(Income::class)->withPivot('quantity');
    }
}
