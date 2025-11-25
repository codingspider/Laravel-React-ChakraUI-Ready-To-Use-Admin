<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = getCurrencies();
        foreach($datas as $key => $value){
            Currency::create([
                'key' => $key,
                'value' => $value,
            ]);
        }
    }
}
