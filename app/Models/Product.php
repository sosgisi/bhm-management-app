<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'unit',
        'image',
        'quantity',
        'category',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_product')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    // public function admin()
    // {
    //     return $this->belongsTo(Admin::class);
    // }

    // public function cart()
    // {
    //     return $this->belongsTo(Cart::class);
    // }
}
